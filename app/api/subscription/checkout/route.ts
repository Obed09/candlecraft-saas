import { NextRequest, NextResponse } from 'next/server';
import { getAppSession } from '@/lib/session';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

/**
 * POST /api/subscription/checkout
 * Create a Stripe checkout session for upgrading/subscribing
 * Works for both new subscriptions and upgrades
 */
export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    const isStripeConfigured = process.env.STRIPE_SECRET_KEY && 
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
    const { plan } = body;

    // Validate plan
    if (!['starter', 'pro', 'business'].includes(plan)) {
      return NextResponse.json(
        { error: 'Invalid plan selected. Please choose starter, pro, or business.' },
        { status: 400 }
      );
    }

    // Check if user is on a locked free tier (demo accounts)
    const userBusiness = await prisma.business.findFirst({
      where: { user: { email: session.user.email } },
      include: { subscription: true },
    });
    if (userBusiness?.subscription?.isLockedFree) {
      return NextResponse.json(
        { error: 'Demo accounts cannot be upgraded. Please contact support.' },
        { status: 403 }
      );
    }

    // Get user with business and subscription
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        business: {
          include: {
            subscription: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Ensure user has a business
    let business = user.business;
    if (!business) {
      business = await prisma.business.create({
        data: {
          name: `${user.name}'s Business`,
          userId: user.id,
          subscription: {
            create: {
              plan: 'free',
              status: 'active'
            }
          }
        },
        include: {
          subscription: true
        }
      });
    }

    const subscription = business.subscription;

    // Create or get Stripe customer
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

      // Update subscription with customer ID
      await prisma.subscription.upsert({
        where: { businessId: business.id },
        update: { stripeCustomerId: customerId },
        create: {
          businessId: business.id,
          plan: 'free',
          status: 'active',
          stripeCustomerId: customerId
        }
      });
    }

    // Price IDs based on plan
    const priceIds: Record<string, string> = {
      starter: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID || 'price_starter_monthly',
      pro: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || 'price_pro_monthly',
      business: process.env.STRIPE_BUSINESS_MONTHLY_PRICE_ID || 'price_business_monthly',
    };

    // Check if upgrading existing subscription
    const isUpgrade = subscription?.stripeSubscriptionId && subscription.status === 'active';

    let checkoutSession;

    if (isUpgrade) {
      // Upgrading - go to billing portal
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/analytics?upgraded=true`,
      });

      return NextResponse.json({
        url: portalSession.url,
        isUpgrade: true
      });
    } else {
      // New subscription - create checkout session
      checkoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceIds[plan],
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
          trial_period_days: 14,
          metadata: {
            businessId: business.id,
            userId: user.id,
            plan,
          },
        },
      });

      // Update subscription to pending
      await prisma.subscription.update({
        where: { businessId: business.id },
        data: {
          plan: plan,
          status: 'incomplete',
        },
      });

      return NextResponse.json({
        url: checkoutSession.url,
        isUpgrade: false
      });
    }

  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: error.message },
      { status: 500 }
    );
  }
}
