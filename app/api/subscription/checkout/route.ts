import { NextRequest, NextResponse } from 'next/server';
import { getAppSession } from '@/lib/session';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

/**
 * POST /api/subscription/checkout
 *
 * Creates a REAL Stripe Checkout Session. There is no fake checkout here:
 * every session is created against the live Stripe API with a real customer.
 *
 * Default mode is `payment` — a single, one-time "setup / completion" charge
 * appropriate for the CandlePilots launch. The price is NEVER invented in
 * code. It is read from owner configuration:
 *
 *   - STRIPE_SETUP_PRICE_ID        -> a real Stripe Price object (recommended)
 *   - STRIPE_SETUP_AMOUNT_CENTS    -> or a direct amount (with STRIPE_SETUP_CURRENCY)
 *
 * If neither is set, the endpoint honestly returns 503 (not configured)
 * instead of fabricating a price.
 *
 * `mode: "subscription"` remains reachable so the acquiring owner can wire up
 * their own recurring plan later (real Stripe Prices only — no placeholder IDs).
 * The subscription path is NOT exposed by the default UI; it is plumbing for
 * the future owner.
 */
export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured (real secret key present)
    const isStripeConfigured =
      process.env.STRIPE_SECRET_KEY &&
      !process.env.STRIPE_SECRET_KEY.includes('your_stripe') &&
      process.env.STRIPE_SECRET_KEY.startsWith('sk_');

    if (!isStripeConfigured) {
      return NextResponse.json(
        { error: 'Payment system is not configured yet. Please contact support.' },
        { status: 503 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-12-15.clover',
    });

    const session = await getAppSession();
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in first' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { mode = 'payment', plan } = body;

    if (mode !== 'payment' && mode !== 'subscription') {
      return NextResponse.json(
        { error: 'Invalid mode. Supported modes: payment, subscription.' },
        { status: 400 }
      );
    }

    // Get user with business and subscription
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        business: {
          include: {
            subscription: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Ensure user has a business (and a subscription row)
    let business = user.business;
    if (!business) {
      business = await prisma.business.create({
        data: {
          name: `${user.name}'s Business`,
          userId: user.id,
          subscription: {
            create: {
              plan: 'free',
              status: 'active',
            },
          },
        },
        include: {
          subscription: true,
        },
      });
    }

    const subscription = business.subscription;

    // Demo / locked-free accounts cannot take a real payment
    if (subscription?.isLockedFree) {
      return NextResponse.json(
        { error: 'Demo accounts cannot complete payment. Please contact support.' },
        { status: 403 }
      );
    }

    // Create or reuse Stripe customer
    let customerId = subscription?.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name || undefined,
        metadata: {
          businessId: business.id,
          userId: user.id,
        },
      });
      customerId = customer.id;

      await prisma.subscription.upsert({
        where: { businessId: business.id },
        update: { stripeCustomerId: customerId },
        create: {
          businessId: business.id,
          plan: 'free',
          status: 'active',
          stripeCustomerId: customerId,
        },
      });
    }

    // ------------------------------------------------------------------
    // ONE-TIME setup / completion fee (the default for launch)
    // ------------------------------------------------------------------
    if (mode === 'payment') {
      const priceId = process.env.STRIPE_SETUP_PRICE_ID;
      const amountCents = process.env.STRIPE_SETUP_AMOUNT_CENTS;
      const currency = process.env.STRIPE_SETUP_CURRENCY;

      // No price invented here — if nothing is configured, say so honestly.
      if (!priceId && !amountCents) {
        return NextResponse.json(
          {
            error:
              'Payment is not configured yet. The owner must set STRIPE_SETUP_PRICE_ID (recommended) or STRIPE_SETUP_AMOUNT_CENTS before this can be enabled.',
            code: 'PAYMENT_NOT_CONFIGURED',
          },
          { status: 503 }
        );
      }

      const checkoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: priceId
          ? [{ price: priceId, quantity: 1 }]
          : [
              {
                price_data: {
                  currency: currency || 'usd',
                  product_data: { name: 'CandlePilots setup / completion fee' },
                  unit_amount: Number(amountCents),
                },
                quantity: 1,
              },
            ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/analytics?paid=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription-plans?canceled=true`,
        metadata: {
          businessId: business.id,
          userId: user.id,
          type: 'setup_fee',
          priceId: priceId || '',
        },
      });

      return NextResponse.json({
        url: checkoutSession.url,
        mode: 'payment',
      });
    }

    // ------------------------------------------------------------------
    // SUBSCRIPTION mode — reachable plumbing for the future owner's plan
    // ------------------------------------------------------------------
    if (!['starter', 'pro', 'business'].includes(plan)) {
      return NextResponse.json(
        { error: 'Invalid plan selected. Please choose starter, pro, or business.' },
        { status: 400 }
      );
    }

    const priceIds: Record<string, string | undefined> = {
      starter: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID,
      pro: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
      business: process.env.STRIPE_BUSINESS_MONTHLY_PRICE_ID,
    };

    const priceId = priceIds[plan as keyof typeof priceIds];
    if (!priceId) {
      return NextResponse.json(
        {
          error: `Subscriptions are not configured yet. Set the real STRIPE_<PLAN>_MONTHLY_PRICE_ID for "${plan}" before enabling.`,
          code: 'PAYMENT_NOT_CONFIGURED',
        },
        { status: 503 }
      );
    }

    // If the user already has an active Stripe subscription, route them to the
    // billing portal (real Stripe) instead of creating a duplicate.
    if (subscription?.stripeSubscriptionId && subscription.status === 'active') {
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/analytics?upgraded=true`,
      });

      return NextResponse.json({
        url: portalSession.url,
        mode: 'subscription',
        isUpgrade: true,
      });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/analytics?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription-plans?canceled=true`,
      metadata: {
        businessId: business.id,
        userId: user.id,
        plan,
      },
      subscription_data: {
        trial_period_days: process.env.STRIPE_SUBSCRIPTION_TRIAL_DAYS
          ? Number(process.env.STRIPE_SUBSCRIPTION_TRIAL_DAYS)
          : 0,
        metadata: {
          businessId: business.id,
          userId: user.id,
          plan,
        },
      },
    });

    // Mark the subscription row as pending so the webhook can finalize it.
    await prisma.subscription.update({
      where: { businessId: business.id },
      data: {
        plan,
        status: 'incomplete',
      },
    });

    return NextResponse.json({
      url: checkoutSession.url,
      mode: 'subscription',
    });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: error.message },
      { status: 500 }
    );
  }
}
