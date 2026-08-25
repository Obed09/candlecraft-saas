/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "No signature provided" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const businessId = session.metadata?.businessId;

        if (!businessId) {
          console.error("Missing businessId in checkout session metadata");
          break;
        }

        if (session.mode === "subscription") {
          const subscriptionId = session.subscription as string;
          const plan = session.metadata?.plan;

          if (!plan) {
            console.error("Missing plan in checkout session metadata");
            break;
          }

          // Get subscription details
          const subscription = (await stripe.subscriptions.retrieve(
            subscriptionId
          )) as Stripe.Subscription;
          const isTrialing = subscription.status === "trialing";
          const trialEnd = (subscription as any).trial_end;

          // Update database
          await prisma.subscription.update({
            where: { businessId },
            data: {
              plan,
              status: isTrialing ? "trialing" : "active",
              stripeSubscriptionId: subscriptionId,
              stripePriceId: subscription.items.data[0].price.id,
              stripeCurrentPeriodEnd: (subscription as any).current_period_end
                ? new Date((subscription as any).current_period_end * 1000)
                : null,
              isOnTrial: isTrialing,
              trialEndsAt: trialEnd ? new Date(trialEnd * 1000) : null,
            },
          });

          console.log(
            `Subscription ${isTrialing ? "trial started" : "activated"} for business ${businessId}`
          );
        } else if (session.mode === "payment") {
          // One-time setup / completion fee paid.
          //
          // This is a single non-recurring charge. It does NOT grant a paid
          // tier (the user's plan stays "free" until the future owner defines
          // their own plan model). We only record that the one-time setup fee
          // was completed so the account shows an honest, good-standing state.
          await prisma.subscription.upsert({
            where: { businessId },
            update: {
              status: "active",
              stripeSubscriptionId: null,
              stripePriceId: session.metadata?.priceId || null,
              stripeCurrentPeriodEnd: null,
              isOnTrial: false,
              trialEndsAt: null,
            },
            create: {
              businessId,
              plan: "free",
              status: "active",
              stripeSubscriptionId: null,
              stripePriceId: session.metadata?.priceId || null,
            },
          });

          console.log(
            `One-time setup fee paid for business ${businessId}${
              session.metadata?.priceId ? ` (price ${session.metadata.priceId})` : ""
            }`
          );
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;

        // Find subscription by Stripe ID
        const dbSubscription = await prisma.subscription.findUnique({
          where: { stripeSubscriptionId: subscription.id },
        });

        if (dbSubscription) {
          const isTrialing = subscription.status === "trialing";
          const trialEnd = (subscription as any).trial_end;
          await prisma.subscription.update({
            where: { id: dbSubscription.id },
            data: {
              status: subscription.status,
              stripeCurrentPeriodEnd: (subscription as any).current_period_end
                ? new Date((subscription as any).current_period_end * 1000)
                : null,
              stripePriceId: subscription.items.data[0].price.id,
              isOnTrial: isTrialing,
              trialEndsAt: trialEnd
                ? new Date(trialEnd * 1000)
                : isTrialing
                ? undefined
                : null,
            },
          });

          console.log(
            `Subscription updated: ${subscription.id} (status: ${subscription.status})`
          );
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        // Find and downgrade to free
        const dbSubscription = await prisma.subscription.findUnique({
          where: { stripeSubscriptionId: subscription.id },
        });

        if (dbSubscription) {
          await prisma.subscription.update({
            where: { id: dbSubscription.id },
            data: {
              plan: "free",
              status: "canceled",
              stripeSubscriptionId: null,
              stripePriceId: null,
              stripeCurrentPeriodEnd: null,
              isOnTrial: false,
              trialEndsAt: null,
            },
          });

          console.log(`Subscription canceled: ${subscription.id}`);
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId =
          typeof (invoice as any).subscription === "string"
            ? (invoice as any).subscription
            : (invoice as any).subscription?.id;

        if (subscriptionId) {
          const dbSubscription = await prisma.subscription.findUnique({
            where: { stripeSubscriptionId: subscriptionId },
          });

          if (dbSubscription) {
            await prisma.subscription.update({
              where: { id: dbSubscription.id },
              data: {
                status: "active",
              },
            });

            console.log(`Payment succeeded for subscription: ${subscriptionId}`);
          }
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId =
          typeof (invoice as any).subscription === "string"
            ? (invoice as any).subscription
            : (invoice as any).subscription?.id;

        if (subscriptionId) {
          const dbSubscription = await prisma.subscription.findUnique({
            where: { stripeSubscriptionId: subscriptionId },
          });

          if (dbSubscription) {
            await prisma.subscription.update({
              where: { id: dbSubscription.id },
              data: {
                status: "past_due",
              },
            });

            console.log(`Payment failed for subscription: ${subscriptionId}`);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
