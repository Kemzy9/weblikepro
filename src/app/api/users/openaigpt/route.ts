import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions.mjs';
import imageCache from '../imageCache';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let conversationHistory: ChatCompletionMessageParam[] = [];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const prompt = formData.get('prompt') as string;
    const imageId = formData.get('imageId') as string;

    if (!prompt || !imageId) {
      return NextResponse.json({ error: 'Prompt and Image ID are required' }, { status: 400 });
    }

    const imageUrl = imageCache.get(imageId);
    console.log(`OpenAI route - Retrieved image: ${imageId} -> ${imageUrl}`); // Add this log

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    const enhancedPrompt = `Analyze the following image and ${prompt}`;

    let messages: ChatCompletionMessageParam[] = [
      ...conversationHistory,
      {
        role: "user",
        content: [
          { type: "text", text: enhancedPrompt },
          {
            type: "image_url",
            image_url: {
              url: imageUrl
            }
          }
        ]
      }
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-2024-08-06',
      messages: messages,
      max_tokens: 4000,
    });

    const assistantResponse = response.choices[0].message.content;

    conversationHistory.push({ role: "user", content: enhancedPrompt });
    conversationHistory.push({ role: "assistant", content: assistantResponse });

    if (conversationHistory.length > 10) {
      conversationHistory = conversationHistory.slice(-10);
    }

    return NextResponse.json({ result: assistantResponse });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
////corectly working 
