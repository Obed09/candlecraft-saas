import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "./auth";
import { canCreateResource, hasFeatureAccess } from "./subscription";

/**
 * Middleware to protect API routes and check authentication
 */
export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      session: null,
      userId: null,
    };
  }

  return {
    error: null,
    session,
    userId: (session.user as any).id,
  };
}

/**
 * Middleware to check if user can create a resource based on their plan
 */
export async function requireResourceLimit(
  userId: string,
  resourceType: "recipes" | "orders" | "customers" | "products"
) {
  const check = await canCreateResource(userId, resourceType);

  if (!check.allowed) {
    return {
      error: NextResponse.json(
        {
          error: check.message || "Resource limit reached",
          limit: check.limit,
          current: check.current,
          upgradeRequired: true,
        },
        { status: 403 }
      ),
      allowed: false,
    };
  }

  return {
    error: null,
    allowed: true,
    current: check.current,
    limit: check.limit,
  };
}

/**
 * Middleware to check if user has access to a feature
 */
export async function requireFeatureAccess(
  userId: string,
  feature:
    | "hasAIFeatures"
    | "hasAdvancedAnalytics"
    | "hasMultipleUsers"
    | "hasPrioritySupport"
    | "hasAPIAccess"
) {
  const hasAccess = await hasFeatureAccess(userId, feature);

  if (!hasAccess) {
    return {
      error: NextResponse.json(
        {
          error: "This feature is not available on your current plan",
          feature,
          upgradeRequired: true,
        },
        { status: 403 }
      ),
      hasAccess: false,
    };
  }

  return {
    error: null,
    hasAccess: true,
  };
}

/**
 * Combined middleware for auth + resource limit check
 */
export async function withAuthAndLimit(
  resourceType: "recipes" | "orders" | "customers" | "products"
) {
  const auth = await requireAuth();
  if (auth.error) return auth;

  const limit = await requireResourceLimit(auth.userId!, resourceType);
  if (limit.error) return { ...auth, ...limit };

  return { ...auth, ...limit };
}

/**
 * Combined middleware for auth + feature check
 */
export async function withAuthAndFeature(
  feature:
    | "hasAIFeatures"
    | "hasAdvancedAnalytics"
    | "hasMultipleUsers"
    | "hasPrioritySupport"
    | "hasAPIAccess"
) {
  const auth = await requireAuth();
  if (auth.error) return auth;

  const featureCheck = await requireFeatureAccess(auth.userId!, feature);
  if (featureCheck.error) return { ...auth, ...featureCheck };

  return { ...auth, ...featureCheck };
}
