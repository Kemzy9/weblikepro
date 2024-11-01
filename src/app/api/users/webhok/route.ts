import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

const SUBSCRIPTION_LIMITS = {
  starter: {
    monthly: { landingPages: 1, logos: 20, themes: 5, aiPrompts: 200 },
    yearly: { landingPages: 1, logos: 20, themes: 5, aiPrompts: 200 }
  },
  creator: {
    monthly: { landingPages: 4, logos: 50, themes: 10, aiPrompts: 500 },
    yearly: { landingPages: 4, logos: 50, themes: 10, aiPrompts: 500 }
  },
  professional: {
    monthly: { landingPages: 8, logos: 100, themes: 20, aiPrompts: 1000 },
    yearly: { landingPages: 8, logos: 100, themes: 20, aiPrompts: 1000 }
  }
};

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const eventName = payload.meta.event_name;

    // Connect to MongoDB
    await client.connect();
    const database = client.db('your_database_name');
    const usersCollection = database.collection('users');

    switch (eventName) {
      case 'subscription_created':
      case 'subscription_updated':
        const subscriptionData = payload.data.attributes;
        const userId = subscriptionData.custom_data.user_id;
        const plan = subscriptionData.product_name.toLowerCase();
        const billingInterval = subscriptionData.billing_interval === 'year' ? 'yearly' : 'monthly';
        
        // Get the limits for the subscription plan
        const limits = SUBSCRIPTION_LIMITS[plan as keyof typeof SUBSCRIPTION_LIMITS]?.[billingInterval];

        if (!limits) {
          console.error(`Invalid plan or billing interval: ${plan} ${billingInterval}`);
          return NextResponse.json({ error: 'Invalid plan or billing interval' }, { status: 400 });
        }

        await usersCollection.updateOne(
          { _id: new ObjectId(userId) },
          {
            $set: {
              subscription: {
                plan: plan,
                billingInterval: billingInterval,
                limits: limits,
                status: subscriptionData.status,
                createdAt: new Date(subscriptionData.created_at),
                updatedAt: new Date(subscriptionData.updated_at),
                renewsAt: subscriptionData.renews_at ? new Date(subscriptionData.renews_at) : null,
                endsAt: subscriptionData.ends_at ? new Date(subscriptionData.ends_at) : null,
              },
              checkoutStatus: 'completed'
            }
          },
          { upsert: true }
        );
        console.log(`Updated subscription for user ${userId} with plan ${plan} (${billingInterval})`);
        break;

      case 'subscription_cancelled':
      case 'subscription_expired':
        const cancelledData = payload.data.attributes;
        const cancelledUserId = cancelledData.custom_data.user_id;

        await usersCollection.updateOne(
          { _id: new ObjectId(cancelledUserId) },
          {
            $unset: { subscription: "" },
            $set: { checkoutStatus: 'cancelled' }
          }
        );
        console.log(`Removed subscription for user ${cancelledUserId}`);
        break;

      default:
        console.log(`Unhandled event: ${eventName}`);
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Error processing webhook' }, { status: 500 });
  } finally {
    await client.close();
  }
}

// You can keep the PUT method if needed for other purposes
// ... (keep the existing imports and SUBSCRIPTION_LIMITS constant)

export async function PUT(req: Request) {
  try {
    const payload = await req.json();
    const eventName = payload.meta.event_name;

    // Connect to MongoDB
    await client.connect();
    const database = client.db('your_database_name');
    const usersCollection = database.collection('users');

    switch (eventName) {
      case 'subscription_created':
      case 'subscription_updated':
        const subscriptionData = payload.data;
        const userId = subscriptionData.attributes.custom_data.user_id;
        const plan = subscriptionData.attributes.product_name.toLowerCase();
        const billingInterval = subscriptionData.attributes.billing_interval === 'year' ? 'yearly' : 'monthly';
        
        // Get the limits for the subscription plan
        const limits = SUBSCRIPTION_LIMITS[plan as keyof typeof SUBSCRIPTION_LIMITS]?.[billingInterval] || {
          images: 0,
          logos: 0,
          themes: 0,
          aiPrompts: 0
        };

        await usersCollection.updateOne(
          { _id: new ObjectId(userId) },
          {
            $set: {
              'subscription.plan': plan,
              'subscription.billingInterval': billingInterval,
              'subscription.limits': limits,
              'subscription.status': subscriptionData.attributes.status,
              'subscription.createdAt': new Date(subscriptionData.attributes.created_at),
              'subscription.updatedAt': new Date(subscriptionData.attributes.updated_at),
              'subscription.renewsAt': subscriptionData.attributes.renews_at ? new Date(subscriptionData.attributes.renews_at) : null,
              'subscription.endsAt': subscriptionData.attributes.ends_at ? new Date(subscriptionData.attributes.ends_at) : null,
              checkoutStatus: 'completed'
            },
            $setOnInsert: {
              'subscription.usage': {
                imagesUsed: 0,
                logosUsed: 0,
                themesUsed: 0,
                aiPromptsUsed: 0
              }
            }
          },
          { upsert: true }
        );
        console.log(`Updated subscription for user ${userId} with plan ${plan} (${billingInterval})`);
        break;

      case 'subscription_cancelled':
      case 'subscription_refunded':
        const cancelledData = payload.data;
        const cancelledUserId = cancelledData.attributes.custom_data.user_id;

        await usersCollection.updateOne(
          { _id: new ObjectId(cancelledUserId) },
          {
            $unset: { subscription: "" },
            $set: { checkoutStatus: 'cancelled' }
          }
        );
        console.log(`Removed subscription for user ${cancelledUserId}`);
        break;

      case 'order_created':
        const orderData = payload.data;
        const orderUserId = orderData.attributes.custom_data.user_id;
        
        await usersCollection.updateOne(
          { _id: new ObjectId(orderUserId) },
          {
            $set: {
              checkoutStatus: 'completed',
              orderCreatedAt: new Date(orderData.attributes.created_at),
              orderId: orderData.id,
              orderTotal: orderData.attributes.total,
              orderCurrency: orderData.attributes.currency,
            }
          }
        );
        console.log(`Updated order status for user ${orderUserId}`);
        break;

      default:
        console.log(`Unhandled event: ${eventName}`);
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Error processing webhook' }, { status: 500 });
  } finally {
    await client.close();
  }
}