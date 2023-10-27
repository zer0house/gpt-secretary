import { OpenAIStream } from '@/core/utils/OpenAIStream';
import { CreateChatCompletionRequest } from '@/core/types';

export const config = {
  runtime: "edge",
};

export default async function handler(
  req: Request,
) {
  const { content} = (await req.json()) as { content: string};
  const payload: CreateChatCompletionRequest = {
    model: 'gpt-3.5-turbo',
    max_tokens: 2048,
    messages: [
      {
        role: 'assistant',
        content: 'You have to answer in the language you receive',
      },
      {
        role: 'assistant',
        content: '나의 역할은 물리학 교사이다. 나는 학생에게 물리학을 가르친다.'
      },
      {
        role: 'assistant',
        content: '친절하게 학생들에게 물리학을 가르쳐 주세요.'
      },
      {
        role: 'user',
        content: ` ${content}`,
      },
    ],
    stream: true,
  };
  const stream = await OpenAIStream(payload);
  return new Response(stream);
}

// import { OpenAIStream, StreamingTextResponse } from "ai";
// import { Configuration, OpenAIApi } from "openai-edge";
// import { SYSTEM_PROMPT } from "@/constants/message";

// // Create an OpenAI API client (that's edge friendly!)
// const openAIConfiguration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(openAIConfiguration);

// // See https://vercel.com/docs/concepts/functions/edge-functions
// export const runtime = "edge";

// export default async function handler(req: Request) {
//   // Extract the `messages` from the body of the request
//   const { messages } = await req.json();

//   // Ask OpenAI for a streaming chat completion given the prompt
//   const response = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     stream: true,
//     temperature: 0,
//     max_tokens: 1024,
//     messages: [{ role: "system", content: SYSTEM_PROMPT}, ...messages],
//   });
//   // Convert the response into a friendly text-stream
//   const stream = OpenAIStream(response)
//   // Respond with the stream
//   return new StreamingTextResponse(stream)
// }


