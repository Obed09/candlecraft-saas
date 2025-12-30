import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, plan = "free" } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate plan
    if (!["free", "starter", "pro", "business"].includes(plan)) {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 422 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Create default business for the user
    const business = await prisma.business.create({
      data: {
        name: `${name}'s Business`,
        userId: user.id,
        subscription: {
          create: {
            plan: plan,
            status: "active",
          },
        },
      },
      include: {
        subscription: true,
      },
    });

    // If paid plan selected, create Stripe checkout session
    if (plan !== "free") {
      // Create Stripe customer
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name || undefined,
        metadata: {
          businessId: business.id,
          userId: user.id,
        },
      });

      // Update subscription with customer ID
      await prisma.subscription.update({
        where: { businessId: business.id },
        data: { stripeCustomerId: customer.id },
      });

      // Price IDs based on plan
      const priceIds: Record<string, string> = {
        starter:
          process.env.STRIPE_STARTER_MONTHLY_PRICE_ID ||
          "price_starter_monthly",
        pro: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || "price_pro_monthly",
        business:
          process.env.STRIPE_BUSINESS_MONTHLY_PRICE_ID ||
          "price_business_monthly",
      };

      // Create checkout session
      const checkoutSession = await stripe.checkout.sessions.create({
        customer: customer.id,
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceIds[plan],
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/analytics?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/sign-up?canceled=true`,
        metadata: {
          businessId: business.id,
          userId: user.id,
          plan,
        },
      });

      return NextResponse.json(
        {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          plan,
          checkoutUrl: checkoutSession.url,
        },
        { status: 201 }
      );
    }

    // Free plan - no checkout needed
    return NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        plan,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
