"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DebugPage() {
  const { data: session, status } = useSession();
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/subscription");
        const data = await response.json();
        setSubscriptionData(data);
      } catch (error) {
        console.error("Error fetching subscription:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-2">
          🔍 Debug Info
        </h1>
        <p className="text-gray-600">Check your authentication and subscription status</p>
      </div>

      {/* Session Status */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {status === "authenticated" ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Session Status: Authenticated
              </>
            ) : status === "loading" ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-300 border-t-purple-600 rounded-full animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-600" />
                Not Authenticated
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="text-xs overflow-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Data */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600" />
            Subscription Data from API
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin mx-auto" />
            </div>
          ) : subscriptionData ? (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Plan</p>
                  <Badge className="mt-1 capitalize">
                    {subscriptionData.subscription?.plan || "N/A"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <Badge variant={subscriptionData.subscription?.status === "active" ? "default" : "destructive"} className="mt-1 capitalize">
                    {subscriptionData.subscription?.status || "N/A"}
                  </Badge>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-xs overflow-auto">
                  {JSON.stringify(subscriptionData, null, 2)}
                </pre>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <AlertTriangle className="w-12 h-12 mx-auto mb-2 text-yellow-600" />
              <p>No subscription data found</p>
              <p className="text-sm mt-2">This usually means you don't have a business/subscription setup</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/sign-out">Sign Out</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/sign-up">Go to Signup Page</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/subscription-plans">View Plans</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/recipes">Test Recipe Limits</Link>
            </Button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Expected Values for Free Tier:</h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Plan: "free"</li>
              <li>• Recipe Limit: 3</li>
              <li>• Order Limit: 5</li>
              <li>• Status: "active"</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">🔧 Troubleshooting Steps:</h3>
            <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
              <li>If subscription is null: Your user doesn't have a business/subscription
                <ul className="ml-6 mt-1 list-disc list-inside">
                  <li>Sign out and create a new account via /sign-up</li>
                  <li>Make sure to select a plan during signup</li>
                </ul>
              </li>
              <li>If plan shows wrong value:
                <ul className="ml-6 mt-1 list-disc list-inside">
                  <li>Check Prisma Studio: <code className="bg-blue-100 px-1 rounded">npx prisma studio</code></li>
                  <li>Look at Subscription table for your business</li>
                </ul>
              </li>
              <li>If not authenticated: Sign in at /sign-in</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
