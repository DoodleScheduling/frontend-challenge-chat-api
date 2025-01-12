import { randomUUID } from 'crypto';

import { Message, CreateMessageBody } from '../../types';
import { messageSchema } from '../../schemas';
import { CONFIG } from '../../config';
import { INITIAL_MESSAGES } from '../../data/messages';

const messages: Message[] = [...INITIAL_MESSAGES];

const messagesService = {
  createMessage(data: CreateMessageBody): Message {
    const newMessage = {
      id: randomUUID(),
      ...data,
      timestamp: new Date().toISOString(),
    };

    const validatedMessage = messageSchema.parse(newMessage);
    messages.push(validatedMessage);

    return validatedMessage;
  },

  getMessages(limit?: number, since?: string): Message[] {
    const limitMessages = limit ?? CONFIG.api.defaultMessagesLimit;

    return since
      ? messages
          .filter((msg) => msg.timestamp > new Date(since).toISOString())
          .slice(-limitMessages)
      : messages.slice(-limitMessages);
  },
};

export { messagesService };
