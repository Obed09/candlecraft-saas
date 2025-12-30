import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/apiMiddleware";
import { prisma } from "@/lib/prisma";
import { getUserSubscription } from "@/lib/subscription";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const userId = auth.userId!;

  try {
    const body = await request.json();
    const { plan, billingCycle } = body; // plan: starter, pro, business; billingCycle: monthly, yearly

    if (!plan || !["starter", "pro", "business"].includes(plan)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const subscription = await getUserSubscription(userId);

    if (!subscription) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    const { business } = subscription;

    // Get or create Stripe customer
    let stripeCustomerId = business.subscription?.stripeCustomerId;

    if (!stripeCustomerId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      const customer = await stripe.customers.create({
        email: user?.email || undefined,
        name: user?.name || undefined,
        metadata: {
          businessId: business.id,
          userId: userId,
        },
      });

      stripeCustomerId = customer.id;

      // Update subscription with customer ID
      await prisma.subscription.update({
        where: { businessId: business.id },
        data: { stripeCustomerId },
      });
    }

    // Price IDs - these should match your Stripe dashboard
    const priceIds: Record<string, Record<string, string>> = {
      starter: {
        monthly: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID || "price_starter_monthly",
        yearly: process.env.STRIPE_STARTER_YEARLY_PRICE_ID || "price_starter_yearly",
      },
      pro: {
        monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || "price_pro_monthly",
        yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID || "price_pro_yearly",
      },
      business: {
        monthly: process.env.STRIPE_BUSINESS_MONTHLY_PRICE_ID || "price_business_monthly",
        yearly: process.env.STRIPE_BUSINESS_YEARLY_PRICE_ID || "price_business_yearly",
      },
    };

    const priceId = priceIds[plan][billingCycle || "monthly"];

    // Check if user already has a Stripe subscription
    if (business.subscription?.stripeSubscriptionId) {
      // Update existing subscription
      const stripeSubscription = await stripe.subscriptions.update(
        business.subscription.stripeSubscriptionId,
        {
          items: [
            {
              id: (
                await stripe.subscriptions.retrieve(
                  business.subscription.stripeSubscriptionId
                )
              ).items.data[0].id,
              price: priceId,
            },
          ],
          proration_behavior: "always_invoice",
        }
      );

      // Update database
      await prisma.subscription.update({
        where: { businessId: business.id },
        data: {
          plan,
          stripePriceId: priceId,
          stripeCurrentPeriodEnd: new Date(
            stripeSubscription.current_period_end * 1000
          ),
        },
      });

      return NextResponse.json({
        message: "Subscription updated successfully",
        subscription: stripeSubscription,
      });
    } else {
      // Create checkout session for new subscription
      const checkoutSession = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?canceled=true`,
        metadata: {
          businessId: business.id,
          userId: userId,
          plan,
        },
      });

      return NextResponse.json({
        checkoutUrl: checkoutSession.url,
        sessionId: checkoutSession.id,
      });
    }
  } catch (error) {
    console.error("Upgrade subscription error:", error);
    return NextResponse.json(
      { error: "Failed to process upgrade" },
      { status: 500 }
    );
  }
}
