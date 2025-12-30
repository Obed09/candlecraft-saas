import { prisma } from "./prisma";

export type SubscriptionPlan = "free" | "starter" | "pro" | "business";

export interface SubscriptionLimits {
  recipes: number;
  orders: number;
  customers: number;
  products: number;
  hasAIFeatures: boolean;
  hasAdvancedAnalytics: boolean;
  hasMultipleUsers: boolean;
  hasPrioritySupport: boolean;
  hasAPIAccess: boolean;
  hasAutomation: boolean;
  hasWhiteLabel: boolean;
}

export const PLAN_LIMITS: Record<SubscriptionPlan, SubscriptionLimits> = {
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
    hasWhiteLabel: false,
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
    hasWhiteLabel: false,
  },
  pro: {
    recipes: -1, // unlimited
    orders: -1,
    customers: -1,
    products: -1,
    hasAIFeatures: true,
    hasAdvancedAnalytics: true,
    hasMultipleUsers: false,
    hasPrioritySupport: true,
    hasAPIAccess: false,
    hasAutomation: true,
    hasWhiteLabel: false,
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
    hasWhiteLabel: true,
  },
};

export const PLAN_PRICES = {
  free: { monthly: 0, yearly: 0 },
  starter: { monthly: 29, yearly: 290 }, // ~$24/mo if paid yearly
  pro: { monthly: 79, yearly: 790 }, // ~$66/mo if paid yearly
  business: { monthly: 149, yearly: 1490 }, // ~$124/mo if paid yearly
};

export const PLAN_NAMES = {
  free: "Free",
  starter: "Starter",
  pro: "Pro",
  business: "Business",
};

export const PLAN_DESCRIPTIONS = {
  free: "Perfect for testing and learning",
  starter: "Great for small businesses getting started",
  pro: "For growing businesses that need full features",
  business: "Enterprise features for scaling operations",
};

/**
 * Get subscription limits for a given plan
 */
export function getPlanLimits(plan: SubscriptionPlan): SubscriptionLimits {
  return PLAN_LIMITS[plan];
}

/**
 * Check if a value is within the limit (-1 means unlimited)
 */
export function isWithinLimit(current: number, limit: number): boolean {
  if (limit === -1) return true;
  return current < limit;
}

/**
 * Get user's business and subscription
 */
export async function getUserSubscription(userId: string) {
  const business = await prisma.business.findUnique({
    where: { userId },
    include: {
      subscription: true,
    },
  });

  if (!business) {
    return null;
  }

  const plan = (business.subscription?.plan || "free") as SubscriptionPlan;
  const limits = getPlanLimits(plan);

  return {
    business,
    subscription: business.subscription,
    plan,
    limits,
  };
}

/**
 * Check if user can create more of a resource type
 */
export async function canCreateResource(
  userId: string,
  resourceType: "recipes" | "orders" | "customers" | "products"
): Promise<{ allowed: boolean; current: number; limit: number; message?: string }> {
  const subscription = await getUserSubscription(userId);

  if (!subscription) {
    return {
      allowed: false,
      current: 0,
      limit: 0,
      message: "Business not found",
    };
  }

  const { business, limits } = subscription;
  const limit = limits[resourceType];

  // Get current count
  let current = 0;
  switch (resourceType) {
    case "recipes":
      current = await prisma.recipe.count({
        where: { businessId: business.id },
      });
      break;
    case "orders":
      current = await prisma.order.count({
        where: { businessId: business.id },
      });
      break;
    case "customers":
      current = await prisma.customer.count({
        where: { businessId: business.id },
      });
      break;
    case "products":
      current = await prisma.product.count({
        where: { businessId: business.id },
      });
      break;
  }

  const allowed = isWithinLimit(current, limit);

  return {
    allowed,
    current,
    limit,
    message: allowed
      ? undefined
      : `You've reached your ${resourceType} limit (${limit}). Please upgrade your plan.`,
  };
}

/**
 * Check if user has access to a feature
 */
export async function hasFeatureAccess(
  userId: string,
  feature:
    | "hasAIFeatures"
    | "hasAdvancedAnalytics"
    | "hasMultipleUsers"
    | "hasPrioritySupport"
    | "hasAPIAccess"
): Promise<boolean> {
  const subscription = await getUserSubscription(userId);

  if (!subscription) {
    return false;
  }

  return subscription.limits[feature];
}

/**
 * Get usage statistics for a user's business
 */
export async function getUsageStats(userId: string) {
  const subscription = await getUserSubscription(userId);

  if (!subscription) {
    return null;
  }

  const { business, limits } = subscription;

  const [recipesCount, ordersCount, customersCount, productsCount] =
    await Promise.all([
      prisma.recipe.count({ where: { businessId: business.id } }),
      prisma.order.count({ where: { businessId: business.id } }),
      prisma.customer.count({ where: { businessId: business.id } }),
      prisma.product.count({ where: { businessId: business.id } }),
    ]);

  return {
    recipes: {
      current: recipesCount,
      limit: limits.recipes,
      percentage:
        limits.recipes === -1 ? 0 : (recipesCount / limits.recipes) * 100,
    },
    orders: {
      current: ordersCount,
      limit: limits.orders,
      percentage:
        limits.orders === -1 ? 0 : (ordersCount / limits.orders) * 100,
    },
    customers: {
      current: customersCount,
      limit: limits.customers,
      percentage:
        limits.customers === -1
          ? 0
          : (customersCount / limits.customers) * 100,
    },
    products: {
      current: productsCount,
      limit: limits.products,
      percentage:
        limits.products === -1 ? 0 : (productsCount / limits.products) * 100,
    },
  };
}
