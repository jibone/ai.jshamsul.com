import { openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages } from "ai";
import { tools } from "@/ai/tools";

export async function POST(request: Request) {
  const { messages } = await request.json();

  const result = await streamText({
    model: openai("gpt-4o"),
    system:
      "You are a friendly assistant! You will reply in a friendly tone." +
      "If user ask you about weather, you are only able to provide weather for Singapore and areas within Singapore." +
      "When user ask for lofi girl use the tools but don't include the link just a nice short info messages",
    messages: convertToCoreMessages(messages),
    maxSteps: 5,
    tools,
  });

  return result.toDataStreamResponse();
}
