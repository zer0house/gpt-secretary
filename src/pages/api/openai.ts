import type { NextApiRequest, NextApiResponse } from 'next'

import { CreateChatCompletionRequest } from 'openai/api';
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

const getJaewookSecretary = async (content: string): Promise<string> => {
  const completionParams: CreateChatCompletionRequest = {
    model: 'gpt-3.5-turbo',
    max_tokens: 1000,
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant',
      },
      {
        role: 'assistant',
        content: process.env.WHO_AM_I as string,
      },
      {
        role: 'user',
        content: `Answer me as Developer Jeong Jae-wook. ${content}`,
      },
    ],
  };

  const response = await openai.createChatCompletion(completionParams);
  return response.data.choices[0].message.content;
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    const reqBody = req.body;
    const reply = await getJaewookSecretary(JSON.parse(reqBody).content as string)
    res.status(200).json(reply); 
  } catch (error) {
    res.status(500).json('비서가 대답에 어려움을 겪고 있습니다.');
  }
}

