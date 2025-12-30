import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/apiMiddleware";
import { prisma } from "@/lib/prisma";
import { getUserSubscription } from "@/lib/subscription";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

export async function POST() {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const userId = auth.userId!;

  try {
    const subscription = await getUserSubscription(userId);

    if (!subscription) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    const { business } = subscription;

    if (!business.subscription?.stripeSubscriptionId) {
      // User is on free plan, just set to free
      await prisma.subscription.update({
        where: { businessId: business.id },
        data: {
          plan: "free",
          status: "active",
          stripePriceId: null,
          stripeCurrentPeriodEnd: null,
        },
      });

      return NextResponse.json({
        message: "Downgraded to free plan",
      });
    }

    // Cancel Stripe subscription
    await stripe.subscriptions.cancel(
      business.subscription.stripeSubscriptionId
    );

    // Update database
    await prisma.subscription.update({
      where: { businessId: business.id },
      data: {
        plan: "free",
        status: "canceled",
        stripeSubscriptionId: null,
        stripePriceId: null,
        stripeCurrentPeriodEnd: null,
      },
    });

    return NextResponse.json({
      message: "Subscription canceled successfully",
    });
  } catch (error) {
    console.error("Cancel subscription error:", error);
    return NextResponse.json(
      { error: "Failed to cancel subscription" },
      { status: 500 }
    );
  }
}
