import { Dayjs } from "dayjs";

export type Role = 'assistant' | 'user';

export type Message = {
  id: string;
  sendAt: Dayjs;
  content: string;
  role: Role;
};

export type ChatCompletionRequestMessage = {
  'role': Role | 'assistant';
  'content': string;
  'name'?: string;
}

export type CreateChatCompletionRequest = {
  'model': string;
  'messages': Array<ChatCompletionRequestMessage>;
  'temperature'?: number | null;
  'top_p'?: number | null;
  'n'?: number | null;
  'stream'?: boolean | null;
  'max_tokens'?: number;
  'presence_penalty'?: number | null;
  'frequency_penalty'?: number | null;
  'logit_bias'?: object | null;
  'user'?: string;
}