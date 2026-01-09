"use client";

// Stripe Business Verification Page - v1.0.2

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, Crown, Building2 } from "lucide-react";

export default function StripeVerificationPage() {
  const plans = [
    {
      name: "Starter",
      icon: Zap,
      price: "$29",
      period: "per month",
      features: ["50 recipes", "100 orders per month", "Basic AI features", "Email support"],
    },
    {
      name: "Pro",
      icon: Crown,
      price: "$79",
      period: "per month",
      features: ["Unlimited recipes", "Unlimited orders", "Full AI features", "Priority support"],
      popular: true,
    },
    {
      name: "Business",
      icon: Building2,
      price: "$149",
      period: "per month",
      features: ["Everything in Pro", "Team collaboration", "API access", "24/7 support"],
    },
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
            All-in-One Candle Business Management Platform with AI-Powered Features
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
            This page is for Stripe account verification purposes
          </p>
        </div>

        {/* Company Info */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">About CandlePilots</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Business Name:</strong> CandlePilots a Division of Limen Lakay LLC
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Website:</strong> www.candlepilots.com
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Product:</strong> Cloud-based SaaS platform for candle makers providing recipe management,
              inventory tracking, cost analysis, AI-powered scent blending, production planning, and business analytics.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Payment Model:</strong> Monthly recurring subscription with 14-day free trial
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Refund Policy:</strong> 30-day money-back guarantee, cancel anytime during trial period
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Customer Support:</strong> Email support (support@candlepilots.com) with 24-48 hour response time
            </p>
          </CardContent>
        </Card>

        {/* Pricing Plans */}
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Subscription Plans
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card
                key={index}
                className={`relative ${
                  plan.popular
                    ? "border-2 border-blue-500 shadow-xl"
                    : "border border-gray-200 dark:border-gray-700"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      MOST POPULAR
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name} Plan</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">{plan.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    className={`w-full mt-6 py-3 px-6 rounded-lg font-bold transition-all ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                    }`}
                  >
                    Start 14-Day Free Trial
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Platform Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">Recipe Management</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Store unlimited candle recipes</li>
                  <li>• Calculate costs automatically</li>
                  <li>• AI-powered scent blending suggestions</li>
                  <li>• Searchable recipe database</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">Business Tools</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Inventory tracking</li>
                  <li>• Order management</li>
                  <li>• Customer database</li>
                  <li>• Analytics & reporting</li>
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
              <strong>Billing:</strong> All subscriptions are billed monthly. First charge occurs after the 14-day free trial period ends.
            </div>
            <div>
              <strong>Cancellation:</strong> Cancel anytime from your account settings. No charges after cancellation.
            </div>
            <div>
              <strong>Refunds:</strong> 30-day money-back guarantee for all paid plans.
            </div>
            <div>
              <strong>Contact:</strong> support@candlepilots.com for any questions or concerns.
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center mt-12 text-gray-600 dark:text-gray-400 text-sm">
          <p>This verification page demonstrates our Stripe integration for payment processing.</p>
          <p className="mt-2">All payments are processed securely through Stripe.</p>
        </div>
      </div>
    </div>
  );
}
