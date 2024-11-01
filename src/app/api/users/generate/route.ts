import Replicate from 'replicate';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { MongoClient, ObjectId } from 'mongodb'; // Assuming MongoDB is your database
import imageCache from '../imageCache';

const client = new MongoClient(process.env.MONGODB_URI as string);





export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { userId, prompt } = body;

    console.log('Received userId:', userId);

    await client.connect();
    const database = client.db('your_database_name');
    const usersCollection = database.collection('users');

    // Convert userId string to ObjectId
    const objectId = new ObjectId(userId);

    // Fetch user subscription and limits
    const user = await usersCollection.findOne({ _id: objectId });
    if (!user) {
      console.log('User not found for userId:', userId);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('User found:', user);

    // Safely access the limits and imageLimit
    const { subscription } = user;
    const imageLimit = subscription?.limits?.imageLimit ?? 0;
    const imageUsage = user.imageUsage ?? 0;
    const renewsAt = subscription?.renewsAt;

    console.log('Image limit:', imageLimit);
    console.log('Current image usage:', imageUsage);

    // Check if the limit has been exceeded
    if (imageUsage >= imageLimit) {
      return NextResponse.json(
        { error: 'Image generation limit reached for this month' },
        { status: 403 }
      );
    }

    const currentDate = new Date();
    if (renewsAt && currentDate > new Date(renewsAt)) {
      // Reset usage if the subscription has renewed
      await usersCollection.updateOne(
        { _id: objectId },
        { $set: { imageUsage: 0, 'subscription.renewsAt': new Date(currentDate.setMonth(currentDate.getMonth() + 1)) } }
      );
    }

    // Proceed with image generation
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN as string,
    });

    const input = {
      prompt: prompt,
      num_outputs: 1,
      aspect_ratio: '9:21',
      output_format: 'jpg',
      output_quality: 100,
    };

    const output = (await replicate.run(
      'black-forest-labs/flux-schnell',
      { input }
    )) as string[];

    const generatedImages = output.map((url) => {
      const imageId = uuidv4();
      imageCache.set(imageId, url);
      console.log(`Stored image: ${imageId} -> ${url}`);
      return { id: imageId, aspect_ratio: input.aspect_ratio };
    });

    // After successful image generation, increment the usage
    await usersCollection.updateOne(
      { _id: objectId },
      { $inc: { imageUsage: 1 } }
    );

    // Return the generated images
    return NextResponse.json({ images: generatedImages });

  } catch (error: any) {
    console.error('Error generating images:', error.message || error);
    return NextResponse.json(
      { error: 'Image generation failed. Please try again later.' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function GET(req: Request): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const imageId = searchParams.get('id');

  if (!imageId) {
    return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
  }

  const imageUrl = imageCache.get(imageId);
  console.log(`Retrieved image: ${imageId} -> ${imageUrl}`);

  if (!imageUrl) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }

  try {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const contentType = response.headers.get('Content-Type') || 'image/jpeg';

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json({ error: 'Error fetching image' }, { status: 500 });
  }
}
///in this when user genrate image first itwill check imag ein db to verified that user are able to generate image or not
