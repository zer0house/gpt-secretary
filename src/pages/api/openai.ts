import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";
import { SYSTEM_PROMPT } from "@/constants/message";

// Create an OpenAI API client (that's edge friendly!)
const openAIConfiguration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(openAIConfiguration);

// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = "edge";

export default async function handler(req: Request) {
  // Extract the `messages` from the body of the request
  let { messages } = await req.json();

  // Check if messages is an array, if not, set it to an empty array
  if (!Array.isArray(messages)) {
    messages = [];
  }

  console.log('messages', messages);

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    stream: true,
    temperature: 0,
    max_tokens: 1024,
    messages: [{ role: "system", content: SYSTEM_PROMPT}, ...messages],

  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}


