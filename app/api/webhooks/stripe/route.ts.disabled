import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      console.error('No signature provided');
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    console.log('Received Stripe webhook:', event.type);

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Checkout completed:', session.id);

        // Get business ID from metadata
        const businessId = session.metadata?.businessId;
        const plan = session.metadata?.plan;

        if (!businessId) {
          console.error('No businessId in session metadata');
          break;
        }

        // Update subscription status to active
        await prisma.subscription.update({
          where: { businessId },
          data: {
            status: 'active',
            stripeSubscriptionId: session.subscription as string,
            stripeCurrentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          },
        });

        console.log(`Subscription activated for business: ${businessId}`);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription updated:', subscription.id);

        // Find subscription by Stripe subscription ID
        const dbSubscription = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscription.id },
        });

        if (!dbSubscription) {
          console.error('Subscription not found:', subscription.id);
          break;
        }

        // Update subscription status
        await prisma.subscription.update({
          where: { id: dbSubscription.id },
          data: {
            status: subscription.status === 'active' ? 'active' : 'inactive',
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });

        console.log(`Subscription status updated: ${subscription.status}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription deleted:', subscription.id);

        // Find subscription by Stripe subscription ID
        const dbSubscription = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscription.id },
        });

        if (!dbSubscription) {
          console.error('Subscription not found:', subscription.id);
          break;
        }

        // Update subscription status to canceled
        await prisma.subscription.update({
          where: { id: dbSubscription.id },
          data: {
            status: 'canceled',
          },
        });

        console.log('Subscription canceled in database');
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Payment failed for invoice:', invoice.id);

        // You might want to send an email notification here
        // Or update the subscription status to 'past_due'
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
