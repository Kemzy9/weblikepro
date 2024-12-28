//api/user/webhook
import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import { headers } from 'next/headers';
import crypto from 'crypto';

const uri = process.env.MONGODB_URI!;

// Create a new MongoClient for each request
function getClient() {
  return new MongoClient(uri);
}

// Add this function at the top level
function getLimitsForPlan(plan: string) {
  switch (plan.toUpperCase()) {
    case 'CREATOR':
      return {
        imageLimit: 5,
        logoLimit: 50,
        aiRequestLimit: 200,
        themeLimit: 50,
        aiPhotoLimit: 50,
      };
    case 'PREMIUM':
      return {
        imageLimit: 10,
        logoLimit: 90,
        aiRequestLimit: 400,
        themeLimit: 90,
        aiPhotoLimit: 90,
      };
    case 'STARTER':
    default:
      return {
        imageLimit: 3,
        logoLimit: 20,
        aiRequestLimit: 100,
        themeLimit: 20,
        aiPhotoLimit: 50,
      };
  }
}

// Verify webhook signature
function verifyWebhookSignature(payload: string, signature: string) {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!;
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export async function POST(req: Request) {
  const client = getClient();
  
  try {
    const payload = await req.text();
    const headersList = headers();
    const signature = headersList.get('x-signature');

    // Verify webhook signature
    if (!signature || !verifyWebhookSignature(payload, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const data = JSON.parse(payload);
    const eventName = data.meta.event_name;
    console.log('Webhook received:', eventName, data);

    const userId = data.meta.custom_data?.user_id;
    const plan = data.meta.custom_data?.plan;

    if (!userId) {
      console.error('Missing user ID in webhook data');
      return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
    }

    await client.connect();
    const database = client.db('your_database_name');
    const usersCollection = database.collection('users');

    switch (eventName) {
      case 'subscription_created':
      case 'subscription_updated':
      case 'subscription_payment_success': {
        const planLimits = getLimitsForPlan(plan);
        const subscriptionData = data.data.attributes;
        
        // Extract portal URLs correctly from Lemon Squeezy response
        const portalUrls = {
          customerPortal: subscriptionData.urls?.customer_portal || subscriptionData.urls?.update_url || null,
          updatePayment: subscriptionData.urls?.update_payment_method || subscriptionData.urls?.update_payment_url || null,
          cancel: subscriptionData.urls?.cancel || subscriptionData.urls?.cancel_url || null,
          invoice: subscriptionData.urls?.invoice || subscriptionData.urls?.invoice_url || null,
          billingPortal: subscriptionData.urls?.billing_portal || null
        };

        console.log('Portal URLs from webhook:', subscriptionData.urls); // Debug log

        await usersCollection.updateOne(
          { _id: new ObjectId(userId) },
          {
            $set: {
              subscription: {
                subscriptionId: data.data.id,
                status: 'active',
                plan: plan,
                createdAt: new Date(subscriptionData.created_at),
                updatedAt: new Date(subscriptionData.updated_at),
                renewsAt: subscriptionData.renews_at ? new Date(subscriptionData.renews_at) : null,
                endsAt: subscriptionData.ends_at ? new Date(subscriptionData.ends_at) : null,
                billingInterval: subscriptionData.billing_interval === 'year' ? 'yearly' : 'monthly',
                limits: planLimits,
                usage: {
                  imagesUsed: 0,
                  logosUsed: 0,
                  themesUsed: 0,
                  aiRequestsUsed: 0,
                  aiPhotosUsed: 0
                },
                // Store URLs at subscription level
                portalUrls: portalUrls,
                // Backup URLs at root level for easier access
                customerPortalUrl: portalUrls.customerPortal,
                updatePaymentUrl: portalUrls.updatePayment,
                cancelUrl: portalUrls.cancel,
                invoiceUrl: portalUrls.invoice,
                billingPortalUrl: portalUrls.billingPortal
              },
              accountStatus: 'active',
              checkoutStatus: 'completed',
              lastPaymentStatus: 'success',
              lastPaymentDate: new Date(),
              // Also store URLs at root level
              portalUrls: portalUrls
            }
          },
          { upsert: true }
        );

        console.log(`Updated subscription for user ${userId} with portal URLs:`, portalUrls);
        break;
      }

      case 'subscription_cancelled':
      case 'subscription_expired':
      case 'subscription_paused': {
        const cancelledData = data.data.attributes;
        
        // Extract URLs from cancelled subscription
        const portalUrls = {
          customerPortal: cancelledData.urls?.customer_portal || cancelledData.urls?.update_url || null,
          updatePayment: cancelledData.urls?.update_payment_method || null,
          cancel: cancelledData.urls?.cancel || null,
          invoice: cancelledData.urls?.invoice || null,
          billingPortal: cancelledData.urls?.billing_portal || null
        };

        await usersCollection.updateOne(
          { _id: new ObjectId(userId) },
          {
            $set: {
              accountStatus: 'inactive',
              checkoutStatus: 'cancelled',
              lastPaymentStatus: 'cancelled',
              'subscription.status': 'cancelled',
              'subscription.endsAt': new Date(),
              'subscription.limits': {
                imageLimit: 0,
                logoLimit: 0,
                aiRequestLimit: 0,
                themeLimit: 0,
                aiPhotoLimit: 0
              },
              serviceAccess: {
                paused: true,
                pausedAt: new Date(),
                reason: eventName,
                reactivationUrl: portalUrls.customerPortal || portalUrls.billingPortal
              },
              // Keep the portal URLs even after cancellation
              portalUrls: portalUrls
            },
            $push: {
              subscriptionHistory: {
                subscriptionId: data.data.id,
                plan: plan,
                status: 'cancelled',
                cancelledAt: new Date(),
                portalUrls: portalUrls
              }
            }
          }
        );
        
        console.log(`Subscription cancelled for user ${userId} with portal URLs:`, portalUrls);
        break;
      }

      case 'order_created': {
        const orderData = data.data.attributes;
        await usersCollection.updateOne(
          { _id: new ObjectId(userId) },
          {
            $set: {
              checkoutStatus: 'completed',
              orderCreatedAt: new Date(orderData.created_at),
              orderId: data.data.id,
              orderTotal: orderData.total,
              orderCurrency: orderData.currency
            }
          }
        );
        break;
      }

      default:
        console.log(`Unhandled event: ${eventName}`);
    }

    return NextResponse.json({ 
      status: 'success',
      message: `Successfully processed ${eventName} event`
    });

  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ 
      error: 'Error processing webhook',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  } finally {
    await client.close();
  }
}

// Separate function to get plan limits
function getPlanLimits(plan: string) {
  switch (plan?.toUpperCase()) {
    case 'CREATOR':
      return {
        imageLimit: 5,
        logoLimit: 50,
        aiRequestLimit: 200,
        themeLimit: 50,
        aiPhotoLimit: 50,
        extraPages: 5
      };
    case 'PREMIUM':
      return {
        imageLimit: 10,
        logoLimit: 90,
        aiRequestLimit: 400,
        themeLimit: 90,
        aiPhotoLimit: 90,
        extraPages: 10
      };
    case 'STARTER':
    default:
      return {
        imageLimit: 3,
        logoLimit: 20,
        aiRequestLimit: 100,
        themeLimit: 20,
        aiPhotoLimit: 50,
        extraPages: 2
      };
  }
}

// You can keep the PUT method if needed for other purposes
// ... (keep the existing imports and SUBSCRIPTION_LIMITS constant)

export async function PUT(req: Request) {
  const client = getClient(); // Add this line to create the MongoDB client

  try {
    const payload = await req.json();
    const eventName = payload.meta.event_name;
    
    // Connect to MongoDB
    await client.connect();
    const database = client.db(process.env.MONGODB_DB!);
    const usersCollection = database.collection('users');

    switch (eventName) {
      case 'subscription_created':
      case 'subscription_updated':
        const subscriptionData = payload.data;
        const userId = subscriptionData.attributes.custom_data.user_id;
        const plan = subscriptionData.attributes.product_name.toLowerCase();
        const billingInterval = subscriptionData.attributes.billing_interval === 'year' ? 'yearly' : 'monthly';
        
        // Get the limits for the subscription plan
        

        await usersCollection.updateOne(
          { _id: new ObjectId(userId) },
          {
            $set: {
              'subscription.plan': plan,
              'subscription.billingInterval': billingInterval,
    
              'subscription.status': subscriptionData.attributes.status,
              'subscription.createdAt': new Date(subscriptionData.attributes.created_at),
              'subscription.updatedAt': new Date(subscriptionData.attributes.updated_at),
              'subscription.renewsAt': subscriptionData.attributes.renews_at ? new Date(subscriptionData.attributes.renews_at) : null,
              'subscription.endsAt': subscriptionData.attributes.ends_at ? new Date(subscriptionData.attributes.ends_at) : null,
              'subscription.usage': {
                imagesUsed: 0,
                logosUsed: 0,
                themesUsed: 0,
                aiPromptsUsed: 0
              },
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
    await client.close(); // This will now work since client is defined
  }
}
 
//in this webhook work corectly and withno mongdb import from create-checkout
