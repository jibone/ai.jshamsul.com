import { createOpenAI } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages } from "ai";

export async function POST(request: Request) {
  const { messages, promptOpt } = await request.json();

  const mesolitica = createOpenAI({
    name: "mallam",
    apiKey: process.env.MESOLITICA_API_KEY,
    baseURL: "https://api.mesolitica.com",
  });

  const result = streamText({
    model: mesolitica("mallam-small"),
    system: `anda adalah chatbot yang reply ${promptOpt} dengan pendek dan ringkas.`,
    messages: convertToCoreMessages(messages),
    maxSteps: 5,
    maxTokens: 500,
    frequencyPenalty: 1.5,
    temperature: 0.2,
    topP: 0.5,
    experimental_continueSteps: true,
  });

  return result.toDataStreamResponse();
}
