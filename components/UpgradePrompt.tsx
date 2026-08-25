"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface UpgradePromptProps {
  resourceType?: "recipes" | "orders" | "customers" | "products";
  feature?: string;
  currentLimit?: number;
}

/**
 * Honest placeholder shown when a user hits a free-plan limit.
 * It does not advertise fabricated plans or prices — it points to the
 * billing page, which is owned/configured by the product owner.
 */
export default function UpgradePrompt({
  resourceType,
  feature,
  currentLimit,
}: UpgradePromptProps) {
  const getMessage = () => {
    if (feature) {
      return `This feature is not available on your current plan. Complete setup and billing to access more.`;
    }
    if (resourceType && currentLimit !== undefined) {
      return `You've reached your ${resourceType} limit (${currentLimit}). Complete setup and billing to access more.`;
    }
    return "Complete setup and billing to access more features.";
  };

  const notes = [
    "Plans & pricing are configured by the product owner",
    "One-time setup is processed securely by Stripe",
  ];

  return (
    <Card className="p-8 text-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800">
      <div className="max-w-md mx-auto space-y-6">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Message */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Limit Reached
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{getMessage()}</p>
        </div>

        {/* Honest notes */}
        <div className="space-y-2">
          {notes.map((note, index) => (
            <div
              key={index}
              className="flex items-center justify-center text-sm text-gray-700 dark:text-gray-300"
            >
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {note}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <Link href="/subscription-plans">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105">
              View Billing
            </Button>
          </Link>
          <Link
            href="/analytics"
            className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            Go back to dashboard
          </Link>
        </div>
      </div>
    </Card>
  );
}
