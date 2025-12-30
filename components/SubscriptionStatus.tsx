"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface SubscriptionData {
  plan: string;
  status: string;
  limits: {
    recipes: number;
    orders: number;
    customers: number;
    products: number;
    hasAIFeatures: boolean;
    hasAdvancedAnalytics: boolean;
  };
  usage: {
    recipes: { current: number; limit: number; percentage: number };
    orders: { current: number; limit: number; percentage: number };
    customers: { current: number; limit: number; percentage: number };
    products: { current: number; limit: number; percentage: number };
  };
}

export default function SubscriptionStatus() {
  const [data, setData] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const response = await fetch("/api/subscription");
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error("Failed to fetch subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  const planColors: Record<string, string> = {
    free: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
    starter: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    pro: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
    enterprise:
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Subscription Plan
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage your subscription and usage
            </p>
          </div>
          <Badge className={planColors[data.plan]}>
            {data.plan.charAt(0).toUpperCase() + data.plan.slice(1)}
          </Badge>
        </div>

        {/* Usage Stats */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Usage Limits
          </h4>

          {Object.entries(data.usage).map(([key, value]) => {
            const limit = value.limit === -1 ? "∞" : value.limit;
            const percentage =
              value.limit === -1 ? 0 : Math.min(value.percentage, 100);
            const isNearLimit = percentage >= 80 && value.limit !== -1;

            return (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300 capitalize">
                    {key}
                  </span>
                  <span
                    className={`font-medium ${
                      isNearLimit
                        ? "text-red-600 dark:text-red-400"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {value.current} / {limit}
                  </span>
                </div>
                {value.limit !== -1 && (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${getProgressColor(
                        percentage
                      )}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Upgrade CTA */}
        {data.plan === "free" && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg">
              <p className="text-sm text-gray-900 dark:text-white font-medium mb-2">
                Unlock More Features
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                Upgrade to access unlimited recipes, orders, AI features, and
                more!
              </p>
              <Link
                href="/subscription-plans"
                className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-md hover:from-blue-700 hover:to-purple-700 transition-colors"
              >
                View Plans
              </Link>
            </div>
          </div>
        )}

        {/* Plan Features */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Your Plan Includes
          </h4>
          <ul className="space-y-2 text-sm">
            <li
              className={`flex items-center ${
                data.limits.hasAIFeatures
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-400 dark:text-gray-600"
              }`}
            >
              <span className="mr-2">
                {data.limits.hasAIFeatures ? "✓" : "×"}
              </span>
              AI Features
            </li>
            <li
              className={`flex items-center ${
                data.limits.hasAdvancedAnalytics
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-400 dark:text-gray-600"
              }`}
            >
              <span className="mr-2">
                {data.limits.hasAdvancedAnalytics ? "✓" : "×"}
              </span>
              Advanced Analytics
            </li>
          </ul>
        </div>

        {/* Manage Subscription */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/settings"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Manage Subscription →
          </Link>
        </div>
      </div>
    </Card>
  );
}
