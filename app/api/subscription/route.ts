import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/apiMiddleware";
import { getUserSubscription, getUsageStats } from "@/lib/subscription";

export async function GET() {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const userId = auth.userId!;

  try {
    const subscription = await getUserSubscription(userId);
    const usage = await getUsageStats(userId);

    if (!subscription) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      plan: subscription.plan,
      status: subscription.subscription?.status || "active",
      limits: subscription.limits,
      usage,
      stripeSubscriptionId: subscription.subscription?.stripeSubscriptionId,
      stripeCurrentPeriodEnd: subscription.subscription?.stripeCurrentPeriodEnd,
    });
  } catch (error) {
    console.error("Get subscription error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription" },
      { status: 500 }
    );
  }
}
