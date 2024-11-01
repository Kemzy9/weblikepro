import Replicate from 'replicate';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Store image URLs in memory (consider using a database for production)
const imageUrlMap = new Map<string, string>();

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { prompt, resolution, numberOfImages } = body;

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN as string,
    });

    const input = {
      prompt,
      num_outputs: numberOfImages,
      aspect_ratio: resolution ? 'custom' : '16:9',
      output_format: 'webp',
      output_quality: 100,
    };

    const output = await replicate.run(
      'black-forest-labs/flux-schnell',
      { input }
    ) as string[];

    const generatedImages = output.map((url) => {
      const id = uuidv4();
      imageUrlMap.set(id, url);
      return { id };
    });

    return NextResponse.json({ images: generatedImages });
  } catch (error: any) {
    console.error('Error generating images:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Image generation failed. Please try again later.' }, { status: 500 });
  }
}

// Add a new GET route to fetch image by ID
export async function GET(req: Request): Promise<NextResponse> {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id || !imageUrlMap.has(id)) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }

  const imageUrl = imageUrlMap.get(id)!;
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();

  return new NextResponse(arrayBuffer, {
    headers: {
      'Content-Type': response.headers.get('Content-Type') || 'image/webp',
    },
  });
}
