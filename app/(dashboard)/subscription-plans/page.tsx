"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Lock } from "lucide-react";
import { useSession } from "next-auth/react";

/**
 * Billing page for CandlePilots launch.
 *
 * There is deliberately NO fake multi-tier subscription UI here. The product is
 * sold through the cto.new Marketplace; the acquiring owner will configure their
 * own pricing/plan after acquisition.
 *
 * For launch we present exactly ONE honest payment path: a one-time
 * "setup / completion" fee charged through a REAL Stripe Checkout Session
 * (mode: "payment"). The amount is read from owner configuration:
 *
 *   - NEXT_PUBLIC_SETUP_FEE_AMOUNT  (display-only label, e.g. "$500")
 *   - STRIPE_SETUP_PRICE_ID         (real Stripe Price) — set server-side
 *   - STRIPE_SETUP_AMOUNT_CENTS     (or a direct amount) — set server-side
 *
 * If Stripe/price is not configured, the page shows an honest "payments not
 * configured" state (the API returns 503) rather than faking a success.
 */
export default function SubscriptionPlansPage() {
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isLockedFree, setIsLockedFree] = useState(false);
  const [notice, setNotice] = useState<{
    kind: "error" | "info";
    text: string;
  } | null>(null);

  // Display-only placeholder for the setup fee label. Clearly optional; the
  // real charge is controlled server-side by STRIPE_SETUP_PRICE_ID /
  // STRIPE_SETUP_AMOUNT_CENTS which the owner configures.
  const configuredFeeLabel = process.env.NEXT_PUBLIC_SETUP_FEE_AMOUNT;

  useEffect(() => {
    // Check if this user is a locked-free (demo) account
    fetch("/api/subscription")
      .then((res) => res.json())
      .then((data) => {
        if (data?.subscription?.isLockedFree) setIsLockedFree(true);
      })
      .catch(() => {});
  }, []);

  const handlePaySetupFee = async () => {
    if (status === "loading" || isLoading) return;

    if (isLockedFree) {
      setNotice({
        kind: "error",
        text: "This is a demo account and cannot complete a payment. Please contact support.",
      });
      return;
    }

    setNotice(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/subscription/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mode: "payment" }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 503) {
          setNotice({
            kind: "info",
            text:
              "Payments are not configured yet. Billing is managed by the product owner — please check back later, or contact support.",
          });
        } else {
          setNotice({
            kind: "error",
            text: data.error || "Could not start checkout. Please try again.",
          });
        }
        return;
      }

      // Redirect to the real Stripe Checkout page.
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Checkout did not return a payment URL.");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      setNotice({
        kind: "error",
        text: error?.message || "Could not start checkout. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Billing
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          One-time setup for your CandlePilots workspace. Plans and ongoing
          pricing are configured by the product owner.
        </p>
      </div>

      {/* Demo account notice */}
      {isLockedFree && (
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center gap-3 text-gray-700 dark:text-gray-300">
          <Lock className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">
            You are using a <strong>Free Demo Account</strong> and cannot
            complete a payment. Please contact support for billing.
          </span>
        </div>
      )}

      {/* Single honest one-time option */}
      <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl">One-time setup</CardTitle>
          </div>
          <p className="text-white/90 text-sm">
            Single completion / setup fee for your workspace
          </p>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Pricing */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                {configuredFeeLabel || "Set by owner"}
              </span>
              <span className="text-gray-500 dark:text-gray-400">one-time</span>
            </div>
            {!configuredFeeLabel && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Display placeholder — the owner configures the price
                (NEXT_PUBLIC_SETUP_FEE_AMOUNT).
              </p>
            )}
          </div>

          <ul className="space-y-3 mb-6">
            {[
              "Secure checkout processed by Stripe",
              "One payment, no recurring charges from us",
            ].map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* Honest notice when payments are not configured */}
          {notice && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm ${
                notice.kind === "error"
                  ? "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                  : "bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800"
              }`}
            >
              {notice.text}
            </div>
          )}

          <button
            onClick={handlePaySetupFee}
            disabled={isLoading || isLockedFree}
            className="w-full py-3 px-6 rounded-lg font-bold transition-all bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Redirecting to Stripe…" : "Complete setup & pay"}
          </button>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
            Billing is managed by the product owner. There is no multi-tier
            subscription for launch.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
