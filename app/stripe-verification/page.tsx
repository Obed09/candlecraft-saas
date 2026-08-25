"use client";
// Stripe Business Verification Page - v1.0.3 (honest billing)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard } from "lucide-react";

/**
 * Page used for Stripe business-account verification. It documents the
 * payment model honestly — a single one-time setup / completion charge —
 * and does NOT present fabricated monthly tiers or a fake 14-day trial.
 * Actual pricing is configured by the product owner (see STRIPE_SETUP_PRICE_ID
 * and STRIPE_SETUP_AMOUNT_CENTS), so no amount is invented here.
 */
export default function StripeVerificationPage() {
  const billingModel = [
    "One-time setup / completion fee per workspace",
    "Charged securely through Stripe (Checkout Session, mode: payment)",
    "No recurring charges from the platform at launch",
    "Ongoing plans & pricing are configured by the product owner",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-600 text-white px-4 py-2">
            Stripe Integration Verification Page
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            CandlePilots SaaS Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            All-in-One Candle Business Management Platform
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
            This page is for Stripe account verification purposes
          </p>
        </div>

        {/* Payment Model / Billing */}
        <Card className="mb-12">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-2xl">Billing & Payment Model</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Approved, honest billing for launch
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {billingModel.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              Configuration: the owner sets STRIPE_SETUP_PRICE_ID (a real Stripe
              Price) or STRIPE_SETUP_AMOUNT_CENTS, plus STRIPE_SECRET_KEY and
              STRIPE_WEBHOOK_SECRET, before any charge is enabled.
            </p>
          </CardContent>
        </Card>

        {/* Platform Features */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Platform Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">Recipe Management</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Calculate costs automatically</li>
                  <li>• Searchable recipe library & testing log</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">Business Tools</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Vessel calculator</li>
                  <li>• Inventory tracking & order management</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms */}
        <Card>
          <CardHeader>
            <CardTitle>Terms & Policies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <strong>Billing:</strong> A one-time setup / completion fee per
              workspace, processed through Stripe. No recurring platform charges
              at launch.
            </div>
            <div>
              <strong>Payments:</strong> Handled by Stripe Checkout with signature
              -verified webhook confirmation. No charges are taken until the owner
              has configured a real Stripe price.
            </div>
            <div>
              <strong>Contact:</strong> support@candlepilots.com for any questions
              or concerns.
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center mt-12 text-gray-600 dark:text-gray-400 text-sm">
          <p>This verification page demonstrates our real Stripe integration for payment processing.</p>
          <p className="mt-2">All payments are processed securely through Stripe.</p>
        </div>
      </div>
    </div>
  );
}
