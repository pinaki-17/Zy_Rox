'use server'; // This directive might not be relevant in an Express backend context in the same way as Next.js
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import dotenv from 'dotenv';

dotenv.config(); // Ensure environment variables are loaded

// Check if GOOGLE_API_KEY is set
if (!process.env.GOOGLE_API_KEY) {
  console.warn(
    'GOOGLE_API_KEY is not set. Genkit Google AI plugin may not function correctly.'
  );
}

export const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GOOGLE_API_KEY })], // Pass API key if needed
  // Default model can be specified here, or in each call
  // model: 'googleai/gemini-pro', 
  // Removed logLevel as it's not a valid option in Genkit v1.x initialization
});

// Example of defining a flow (can be in a separate file)
// import { z } from 'zod';
// const exampleFlow = ai.defineFlow(
//   {
//     name: 'exampleFlow',
//     inputSchema: z.string(),
//     outputSchema: z.string(),
//   },
//   async (prompt) => {
//     const llmResponse = await ai.generate({
//       prompt: prompt,
//       model: 'googleai/gemini-pro', // specify model
//     });
//     return llmResponse.text();
//   }
// );

// export async function runExampleFlow(prompt: string) {
//   return await exampleFlow(prompt);
// }
