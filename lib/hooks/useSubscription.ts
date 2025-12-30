"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface UsageStats {
  recipes: { current: number; limit: number; percentage: number };
  orders: { current: number; limit: number; percentage: number };
  customers: { current: number; limit: number; percentage: number };
  products: { current: number; limit: number; percentage: number };
}

interface SubscriptionLimits {
  recipes: number;
  orders: number;
  customers: number;
  products: number;
  hasAIFeatures: boolean;
  hasAdvancedAnalytics: boolean;
  hasMultipleUsers: boolean;
  hasPrioritySupport: boolean;
  hasAPIAccess: boolean;
}

export function useSubscription() {
  const { data: session } = useSession();
  const [usage, setUsage] = useState<UsageStats | null>(null);
  const [limits, setLimits] = useState<SubscriptionLimits | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetchSubscriptionData();
    }
  }, [session]);

  const fetchSubscriptionData = async () => {
    try {
      const response = await fetch("/api/subscription");
      if (response.ok) {
        const data = await response.json();
        setLimits(data.limits);
        setUsage(data.usage);
      }
    } catch (error) {
      console.error("Failed to fetch subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  const canCreate = (resourceType: keyof UsageStats): boolean => {
    if (!usage || !limits) return false;
    const limit = limits[resourceType];
    if (limit === -1) return true; // unlimited
    return usage[resourceType].current < limit;
  };

  const hasFeature = (
    feature:
      | "hasAIFeatures"
      | "hasAdvancedAnalytics"
      | "hasMultipleUsers"
      | "hasPrioritySupport"
      | "hasAPIAccess"
  ): boolean => {
    return limits?.[feature] || false;
  };

  const getRemainingCount = (resourceType: keyof UsageStats): number => {
    if (!usage || !limits) return 0;
    const limit = limits[resourceType];
    if (limit === -1) return Infinity;
    return Math.max(0, limit - usage[resourceType].current);
  };

  const refreshUsage = () => {
    fetchSubscriptionData();
  };

  return {
    plan: (session?.user as any)?.subscriptionPlan || "free",
    status: (session?.user as any)?.subscriptionStatus || "active",
    usage,
    limits,
    loading,
    canCreate,
    hasFeature,
    getRemainingCount,
    refreshUsage,
  };
}
