"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Lock } from "lucide-react";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan") || "starter";
  const [isProcessing, setIsProcessing] = useState(false);

  const planDetails: Record<string, { name: string; price: string; features: string[] }> = {
    starter: {
      name: "Starter Plan",
      price: "$29",
      features: ["50 recipes", "100 orders per month", "Basic AI features", "Email support"]
    },
    pro: {
      name: "Pro Plan", 
      price: "$79",
      features: ["Unlimited recipes", "Unlimited orders", "Full AI features", "Priority support"]
    },
    business: {
      name: "Business Plan",
      price: "$149",
      features: ["Everything in Pro", "Team collaboration", "API access", "24/7 support"]
    }
  };

  const currentPlan = planDetails[plan] || planDetails.starter;

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert("Payment processing is being configured. Your account has been created!");
      router.push("/analytics?success=true");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-blue-600 text-white">
            Secure Checkout
          </Badge>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Complete Your Purchase
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            <Lock className="inline w-4 h-4 mr-1" />
            Secure payment powered by Stripe
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-start pb-4 border-b">
                <div>
                  <h3 className="font-semibold text-lg">{currentPlan.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monthly subscription</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">{currentPlan.price}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">per month</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-sm">Plan includes:</p>
                {currentPlan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-blue-600">{currentPlan.price}/month</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  14-day free trial • Cancel anytime
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Card Number</label>
                <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="4242 4242 4242 4242"
                    className="flex-1 bg-transparent outline-none"
                    disabled
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry Date</label>
                  <input 
                    type="text" 
                    placeholder="MM / YY"
                    className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVC</label>
                  <input 
                    type="text" 
                    placeholder="123"
                    className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800"
                    disabled
                  />
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-300 font-medium mb-2">
                  🚧 Payment Integration In Progress
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-400">
                  Stripe payment processing is currently being configured. Your account will be created and you'll receive an email once payment is ready.
                </p>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : (
                  `Start 14-Day Free Trial`
                )}
              </button>

              <p className="text-xs text-center text-gray-600 dark:text-gray-400">
                By confirming, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => router.back()}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ← Back to plans
          </button>
        </div>
      </div>
    </div>
  );
}
