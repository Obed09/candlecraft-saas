import { NextRequest, NextResponse } from 'next/server';
import { getAppSession } from '@/lib/session';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/user/subscription
 * Get current user's subscription details
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getAppSession();

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
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

    // If no business or subscription, user is on free plan
    if (!user.business || !user.business.subscription) {
      return NextResponse.json({
        plan: 'free',
        status: 'active',
        features: {
          recipes: 3,
          orders: 5,
          customers: 10,
          products: 20,
          hasAIFeatures: false,
          hasAdvancedAnalytics: false,
          hasMultipleUsers: false,
          hasPrioritySupport: false,
          hasAPIAccess: false,
          hasAutomation: false,
          hasWhiteLabel: false
        }
      });
    }

    const subscription = user.business.subscription;

    // If subscription is not active (incomplete, canceled, etc.), treat as free
    if (subscription.status !== 'active') {
      return NextResponse.json({
        plan: 'free',
        status: subscription.status,
        message: subscription.status === 'incomplete' ? 'Please complete payment to activate your plan' : 'Subscription inactive',
        features: {
          recipes: 3,
          orders: 5,
          customers: 10,
          products: 20,
          hasAIFeatures: false,
          hasAdvancedAnalytics: false,
          hasMultipleUsers: false,
          hasPrioritySupport: false,
          hasAPIAccess: false,
          hasAutomation: false,
          hasWhiteLabel: false
        }
      });
    }

    // Determine feature access based on plan
    const planFeatures = {
      free: {
        recipes: 3,
        orders: 5,
        customers: 10,
        products: 20,
        hasAIFeatures: false,
        hasAdvancedAnalytics: false,
        hasMultipleUsers: false,
        hasPrioritySupport: false,
        hasAPIAccess: false,
        hasAutomation: false,
        hasWhiteLabel: false
      },
      starter: {
        recipes: 50,
        orders: 100,
        customers: 200,
        products: 200,
        hasAIFeatures: true,
        hasAdvancedAnalytics: false,
        hasMultipleUsers: false,
        hasPrioritySupport: false,
        hasAPIAccess: false,
        hasAutomation: false,
        hasWhiteLabel: false
      },
      pro: {
        recipes: -1,
        orders: -1,
        customers: -1,
        products: -1,
        hasAIFeatures: true,
        hasAdvancedAnalytics: true,
        hasMultipleUsers: false,
        hasPrioritySupport: true,
        hasAPIAccess: false,
        hasAutomation: true,
        hasWhiteLabel: false
      },
      business: {
        recipes: -1,
        orders: -1,
        customers: -1,
        products: -1,
        hasAIFeatures: true,
        hasAdvancedAnalytics: true,
        hasMultipleUsers: true,
        hasPrioritySupport: true,
        hasAPIAccess: true,
        hasAutomation: true,
        hasWhiteLabel: true
      }
    };

    const plan = subscription.plan as 'free' | 'starter' | 'pro' | 'business';
    const features = planFeatures[plan] || planFeatures.free;

    return NextResponse.json({
      plan: subscription.plan,
      status: subscription.status,
      stripeCustomerId: subscription.stripeCustomerId,
      stripeSubscriptionId: subscription.stripeSubscriptionId,
      currentPeriodEnd: subscription.stripeCurrentPeriodEnd,
      features
    });

  } catch (error: any) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription', details: error.message },
      { status: 500 }
    );
  }
}
