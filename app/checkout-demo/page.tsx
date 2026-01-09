"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Lock, ArrowLeft } from "lucide-react";

export default function CheckoutDemoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan") || "starter";
  const [isProcessing, setIsProcessing] = useState(false);

  const planDetails: Record<string, { name: string; price: string; period: string; features: string[] }> = {
    starter: {
      name: "Starter Plan",
      price: "$29",
      period: "per month",
      features: ["50 recipes", "100 orders per month", "200 customers", "Basic AI features", "Email support"]
    },
    pro: {
      name: "Pro Plan", 
      price: "$79",
      period: "per month",
      features: ["Unlimited recipes", "Unlimited orders", "Unlimited customers", "Full AI features", "Priority support", "Advanced analytics"]
    },
    business: {
      name: "Business Plan",
      price: "$149",
      period: "per month",
      features: ["Everything in Pro", "Team collaboration (up to 10 users)", "API access", "24/7 priority support", "Custom branding", "Dedicated account manager"]
    }
  };

  const currentPlan = planDetails[plan] || planDetails.starter;

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert("✅ Demo checkout complete! In production, this would process payment via Stripe.");
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => router.push('/subscription-plans')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to plans
          </button>
          
          <div className="text-center">
            <Badge className="mb-4 bg-green-600 text-white px-4 py-2">
              <Lock className="inline w-4 h-4 mr-2" />
              Secure Checkout Demo
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Complete Your Purchase
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Powered by Stripe • PCI DSS Compliant
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Order Summary - Left Side (2 columns) */}
          <div className="lg:col-span-2">
            <Card className="sticky top-8">
              <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* Plan Details */}
                <div className="flex justify-between items-start pb-6 border-b">
                  <div>
                    <h3 className="font-bold text-xl mb-1">{currentPlan.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Billed monthly • Cancel anytime</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {currentPlan.price}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{currentPlan.period}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <p className="font-semibold text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    What's Included:
                  </p>
                  {currentPlan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <Check className="w-5 h-5 text-green-500" />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Trial Info */}
                <div className="pt-6 border-t">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">
                      🎉 14-Day Free Trial
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-400">
                      Try risk-free. Cancel anytime during trial period.
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Today's Total</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        $0.00
                      </span>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Free trial</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form - Right Side (3 columns) */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="you@example.com"
                    defaultValue="demo@candlepilots.com"
                    className="w-full p-3 border-2 rounded-lg bg-white dark:bg-gray-800 focus:border-blue-500 outline-none transition"
                  />
                </div>

                {/* Card Details */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Card Information</label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 border-2 rounded-lg bg-white dark:bg-gray-800">
                      <CreditCard className="w-6 h-6 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="4242 4242 4242 4242"
                        defaultValue="4242 4242 4242 4242"
                        className="flex-1 bg-transparent outline-none"
                      />
                      <div className="flex gap-1">
                        <div className="w-8 h-6 bg-blue-600 rounded"></div>
                        <div className="w-8 h-6 bg-red-600 rounded"></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        placeholder="MM / YY"
                        defaultValue="12 / 26"
                        className="p-3 border-2 rounded-lg bg-white dark:bg-gray-800 focus:border-blue-500 outline-none transition"
                      />
                      <input 
                        type="text" 
                        placeholder="CVC"
                        defaultValue="123"
                        className="p-3 border-2 rounded-lg bg-white dark:bg-gray-800 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Billing Address */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Billing Address</label>
                  <input 
                    type="text" 
                    placeholder="Street address"
                    defaultValue="123 Main St"
                    className="w-full p-3 border-2 rounded-lg bg-white dark:bg-gray-800 focus:border-blue-500 outline-none transition mb-3"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="City"
                      defaultValue="San Francisco"
                      className="p-3 border-2 rounded-lg bg-white dark:bg-gray-800 focus:border-blue-500 outline-none transition"
                    />
                    <input 
                      type="text" 
                      placeholder="ZIP Code"
                      defaultValue="94102"
                      className="p-3 border-2 rounded-lg bg-white dark:bg-gray-800 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                </div>

                {/* Demo Notice */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-5 rounded-lg border-2 border-amber-200 dark:border-amber-800">
                  <p className="text-sm font-bold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-2">
                    <span className="text-xl">🚧</span>
                    Demo Mode - Payment Integration In Progress
                  </p>
                  <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
                    This is a demonstration of the checkout interface. Stripe payment processing is being configured. 
                    No charges will be made. In production, this would securely process payments via Stripe.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Payment...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Lock className="w-5 h-5" />
                      Start 14-Day Free Trial
                    </span>
                  )}
                </button>

                {/* Security Badges */}
                <div className="flex items-center justify-center gap-6 pt-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>256-bit SSL</span>
                  </div>
                  <span>•</span>
                  <span>PCI Compliant</span>
                  <span>•</span>
                  <span>Powered by Stripe</span>
                </div>

                <p className="text-xs text-center text-gray-600 dark:text-gray-400 pt-2">
                  By confirming, you agree to our <a href="/terms-conditions" className="underline">Terms of Service</a> and <a href="/privacy-policy" className="underline">Privacy Policy</a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
