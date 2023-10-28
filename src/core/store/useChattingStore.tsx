import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Message } from '@/core/types';
import { generateRandomString } from '../utils/generateRandomString';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

export type ChattingStoreType = {
  messages: Message[];
  fingerprint: string;
  isWaiting: boolean;
  hasError: boolean;
  actions: {
    pushUserMessage: (content: string) => void;
    pushAssistantMessage: (content: string) => void;
    updateAssistantMessage: (content: string) => void;
    setError: () => void;
    setFingerprint: (fingerprint: string) => void;
  };
};

export const useChattingStore = create(
  devtools<ChattingStoreType>((setState, getState) => ({
    messages: [],
    fingerprint: '',
    isWaiting: false,
    hasError: false,
    actions: {
      pushUserMessage: (content) => {
        const { messages } = getState();
        const message: Message = {
          id: generateRandomString(5),
          sendAt: dayjs(),
          role: 'user',
          content: content,
        };
        setState({
          messages: [...messages, message],
          isWaiting: true,
        });
      },
      pushAssistantMessage: (content) => {
        const { messages } = getState();
        const message: Message = {
          id: generateRandomString(5),
          sendAt: dayjs(),
          role: 'assistant',
          content: content,
        };
        setState({
          messages: [...messages, message],
          isWaiting: false,
        });
      },
      updateAssistantMessage: (content: string) => {
        const { messages } = getState();
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.role === 'assistant') {
          lastMessage.content = content;
          setState({
            messages: [...messages.slice(0, -1), lastMessage]
          });
        } else {
          // 임시 메시지가 없을 경우 새 메시지 추가
          const message: Message = {
            id: generateRandomString(5),
            sendAt: dayjs(),
            role: 'assistant',
            content: content,
          };
          setState({
            messages: [...messages, message],
            isWaiting: false,
          });
        }
      },
      setError: () => {
        setState({ hasError: true, isWaiting: false });
      },
      setFingerprint: (fingerprint) => {
        setState({ fingerprint });
      },
    },
  })),
);

export const useChattingActions = () => useChattingStore(({ actions }) => actions);
