import { Message, CreateMessageBody } from '../../types';
import { messageSchema } from '../../schemas';
import { CONFIG } from '../../config';
import { MessageModel } from '../../models/message.model';

const messagesService = {
  async createMessage(data: CreateMessageBody): Promise<Message> {
    const newMessage = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    const validatedMessage = messageSchema.parse(newMessage);
    const messageDoc = new MessageModel(validatedMessage);
    await messageDoc.save();

    return validatedMessage;
  },

  async getMessages(limit?: number, since?: string): Promise<Message[]> {
    const limitMessages = limit ?? CONFIG.api.defaultMessagesLimit;

    let query = {};

    if (since) {
      query = { timestamp: { $gt: new Date(since).toISOString() } };
    }

    const messages = await MessageModel.find(query)
      .sort({ timestamp: -1 })
      .limit(limitMessages)
      .lean();

    return messages;
  },
};

export { messagesService };
