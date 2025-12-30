"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Perfect for testing",
    features: ["3 recipes", "5 orders", "Basic calculator", "Community support"],
  },
  {
    id: "starter",
    name: "Starter",
    price: "$29/mo",
    description: "Great for small businesses",
    features: ["50 recipes", "100 orders", "Basic AI features", "Email support"],
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$79/mo",
    description: "For growing businesses",
    features: ["Unlimited recipes & orders", "Full AI features", "Automation", "Priority support"],
  },
  {
    id: "business",
    name: "Business",
    price: "$149/mo",
    description: "Enterprise features",
    features: ["Everything in Pro", "Multi-user access", "API access", "White-label"],
  },
];

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedPlan = searchParams.get("plan") || "free";
  
  const [step, setStep] = useState<"plan" | "details">("plan");
  const [selectedPlan, setSelectedPlan] = useState(preselectedPlan);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setStep("details");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      // Register user with selected plan
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          plan: selectedPlan,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        setIsLoading(false);
        return;
      }

      // Auto sign in after registration
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Registration successful but sign in failed. Please try signing in.");
        setIsLoading(false);
        return;
      }

      // If paid plan selected, redirect to Stripe checkout
      if (selectedPlan !== "free" && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        router.push("/analytics");
        router.refresh();
      }
    } catch (error) {
      setError("Something went wrong");
      setIsLoading(false);
    }
  };

  if (step === "plan") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-black dark:to-zinc-900 px-4 py-12">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              Choose Your Plan
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">
              Start with free, upgrade anytime
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 cursor-pointer transition-all hover:scale-105 ${
                  plan.popular
                    ? "ring-2 ring-blue-500 dark:ring-blue-400"
                    : "border border-zinc-200 dark:border-zinc-800"
                }`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">
                    {plan.price}
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-sm text-zinc-700 dark:text-zinc-300"
                    >
                      <svg
                        className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-2 px-4 rounded-md font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors">
                  Select {plan.name}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-zinc-900 dark:text-white hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const selectedPlanInfo = PLANS.find((p) => p.id === selectedPlan) || PLANS[0];

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <button
              onClick={() => setStep("plan")}
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-4 flex items-center"
            >
              ← Back to plans
            </button>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                Create Your Account
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                You selected:{" "}
                <span className="font-semibold text-zinc-900 dark:text-white">
                  {selectedPlanInfo.name} Plan
                </span>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                placeholder="••••••••"
              />
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                {selectedPlanInfo.name} Plan Includes:
              </h3>
              <ul className="space-y-1">
                {selectedPlanInfo.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-zinc-700 dark:text-zinc-300 flex items-center"
                  >
                    <svg
                      className="w-4 h-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              {selectedPlan !== "free" && (
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-3">
                  You&apos;ll be redirected to payment after creating your account
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-3 px-4 rounded-md font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 dark:focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "Creating account..."
                : selectedPlan === "free"
                ? "Create Free Account"
                : `Continue to Payment (${selectedPlanInfo.price})`}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-zinc-900 dark:text-white hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpForm />
    </Suspense>
  );
}
