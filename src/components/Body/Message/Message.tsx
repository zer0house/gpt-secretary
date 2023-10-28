import { Message } from '@/core/types';
import { MessageFlexWrapper, MessageWrapper, MessageBodyWrapper, Time } from './Message.styled';

const Message = ({ message: { sendAt, role, content } }: { message: Message }) => {
  return (
    <MessageFlexWrapper>
      <MessageWrapper $role={role}>
        <MessageBodyWrapper $role={role}>{content}</MessageBodyWrapper>
        <Time>{sendAt.format('HH:mm A')}</Time>
      </MessageWrapper>
    </MessageFlexWrapper>
  );
};

export default Message;
