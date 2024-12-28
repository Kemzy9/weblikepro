import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const { priceId, userId } = await req.json();

    console.log('Received request with:', { priceId, userId });

    // Validate payload
    if (!priceId || typeof priceId !== 'string') {
      console.error('Invalid or missing priceId');
      return NextResponse.json({ error: 'Invalid or missing priceId' }, { status: 400 });
    }

    if (!userId || typeof userId !== 'string') {
      console.error('Invalid or missing userId');
      return NextResponse.json({ error: 'Invalid or missing userId' }, { status: 400 });
    }

    // Determine the plan based on the priceId
    let plan;
    if (priceId === process.env.NEXT_PUBLIC_LEMON_SQUEEZY_STANDARD_YEARLY_PRICE_ID || 
        priceId === process.env.NEXT_PUBLIC_LEMON_SQUEEZY_STANDARD_MONTHLY_PRICE_ID) {
      plan = 'STARTER';
    } else if (priceId === process.env.NEXT_PUBLIC_LEMON_CREATOR_PRO_YEARLY_PRICE_ID || 
               priceId === process.env.NEXT_PUBLIC_LEMON_CREATOR_PRO_MONTHLY_PRICE_ID) {
      plan = 'CREATOR';
    } else if (priceId === process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PREMIUM_YEARLY_PRICE_ID || 
               priceId === process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PREMIUM_MONTHLY_PRICE_ID) {
      plan = 'PREMIUM';
    } else {
      return NextResponse.json({ error: 'Invalid priceId' }, { status: 400 });
    }

    // Call Lemon Squeezy API to create a checkout
    const response = await axios.post(
      'https://api.lemonsqueezy.com/v1/checkouts',
      {
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              custom: {
                user_id: userId,
                plan: plan,
              },
            },
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: process.env.LEMON_SQUEEZY_STORE_ID,
              },
            },
            variant: {
              data: {
                type: "variants",
                id: priceId,
              },
            },
          },
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
        },
      }
    );

    console.log('Lemon Squeezy response:', response.data);

    return NextResponse.json({ url: response.data.data.attributes.url });
  } catch (error) {
    console.error('Error creating checkout:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

function getLimitsForPlan(plan: string) {
  switch (plan) {
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

function addOneMonth(date: Date): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1);
  return result;
}

function isYearly(priceId: string): boolean {
  return [
    process.env.NEXT_PUBLIC_LEMON_SQUEEZY_STANDARD_YEARLY_PRICE_ID,
    process.env.NEXT_PUBLIC_LEMON_CREATOR_PRO_YEARLY_PRICE_ID,
    process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PREMIUM_YEARLY_PRICE_ID
  ].includes(priceId);
}
