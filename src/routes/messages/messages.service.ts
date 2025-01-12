import { randomUUID } from 'crypto';
import { Message, CreateMessageBody } from '../../types';
import { CONFIG } from '../../config';
import { INITIAL_MESSAGES } from '../../data/messages';

// Store messages in memory, in real world scenario this should be a database
const messages: Message[] = [...INITIAL_MESSAGES];

const messagesService = {
  createMessage(data: CreateMessageBody): Message {
    const newMessage: Message = {
      id: randomUUID(),
      ...data,
      timestamp: new Date().toISOString(),
    };

    messages.push(newMessage);
    return newMessage;
  },

  getMessages(limit?: string, since?: string): Message[] {
    const limitMessages = limit
      ? parseInt(limit, 10)
      : CONFIG.api.defaultMessagesLimit;

    return since
      ? messages
          .filter((msg) => msg.timestamp > new Date(since).toISOString())
          .slice(-limitMessages)
      : messages.slice(-limitMessages);
  },
};

export { messagesService };
