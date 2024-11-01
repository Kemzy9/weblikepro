import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions.mjs';


dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const unlinkAsync = promisify(fs.unlink);

let conversationHistory: ChatCompletionMessageParam[] = [];

export async function POST(req: NextRequest) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const formData = await req.formData();
        const prompt = formData.get('prompt') as string;
        
        const selectedCode = formData.get('selectedCode') as string;
        const isContinuation = formData.get('isContinuation') === 'true';
        const file = formData.get('image') as File | null;

        if (!prompt) {
          controller.enqueue(encoder.encode(`0:Error: Prompt is required\n`));
          controller.close();
          return;
        }

        let enhancedPrompt = `${prompt}${selectedCode}`;

        let messages: ChatCompletionMessageParam[] = [
          ...conversationHistory,
          { role: 'user', content: enhancedPrompt }
        ];

        if (file && !isContinuation) {
          const tempPath = path.join('/tmp', file.name);
          const buffer = await file.arrayBuffer();
          await fs.promises.writeFile(tempPath, new Uint8Array(buffer));

          const base64Image = await fs.promises.readFile(tempPath, { encoding: 'base64' });
          const mimeType = file.type || 'image/jpeg';

          messages = [
            ...conversationHistory,
            {
              role: 'user',
              content: [
                { type: 'text', text: enhancedPrompt },
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:${mimeType};base64,${base64Image}`
                  }
                }
              ]
            }
          ];

          await unlinkAsync(tempPath);
        }

        const response = await openai.chat.completions.create({
          model: 'gpt-4o-2024-08-06',
          messages: messages,
          max_tokens: 1000,
          stream: true,
        });

        let textContent = '';
        let codeContent = '';
        let isInCodeBlock = false;

        for await (const part of response) {
          const content = part.choices[0]?.delta?.content || '';
          
          if (content.includes('```')) {
            isInCodeBlock = !isInCodeBlock;
            if (isInCodeBlock) {
              codeContent += '```';
            } else {
              codeContent += '```\n';
              controller.enqueue(encoder.encode(`html:${codeContent}\n`));
              codeContent = '';
            }
          } else if (isInCodeBlock) {
            codeContent += content;
          } else {
            textContent += content;
            controller.enqueue(encoder.encode(`${content}\n`));
          }
        }

        // Send any remaining content
        if (textContent) {
          controller.enqueue(encoder.encode(`${textContent}\n`));
        }
        if (codeContent) {
          controller.enqueue(encoder.encode(`${codeContent}\n`));
        }

        // Update conversation history
        conversationHistory = [...messages, { role: 'assistant', content: textContent + codeContent }];

      } catch (error) {
        console.error('Error processing request:', error);
        controller.enqueue(encoder.encode(`0:Sorry, there was an error processing your request.\n`));
      } finally {
        controller.close();
      }
    }
  });

  return new NextResponse(stream);
}
// working graet and hanging componetns it shave been using 
// whenyu add htm  it replaicng coreact 

