import { FilterQuery } from 'mongoose';

import { Message, MessageInternal, CreateMessageBody } from '../../types';
import { CONFIG, VALIDATION_CONFIG } from '../../config';
import { MessageModel } from '../../models/message.model';

const transformMessage = (message: MessageInternal): Message => ({
  _id: message._id,
  message: message.message,
  author: message.author,
  createdAt: message.createdAt.toISOString(),
});

const messagesService = {
  async createMessage(data: CreateMessageBody): Promise<Message> {
    const messageDoc = await MessageModel.create({
      ...data,
      createdAt: new Date(),
    });

    return transformMessage(messageDoc);
  },

  async getMessages({
    sortOrder = -1,
    limit,
    since,
    before,
  }: {
    sortOrder: 1 | -1;
    limit: number | undefined;
    since: string | undefined;
    before: string | undefined;
  }): Promise<Message[]> {
    const limitMessages = limit
      ? VALIDATION_CONFIG.message.maxLimit
      : CONFIG.api.defaultMessagesLimit;

    const query: FilterQuery<MessageInternal> = {};

    if (since || before) {
      query.createdAt = {};
      if (since) {
        query.createdAt.$gt = new Date(since);
      }
      if (before) {
        query.createdAt.$lt = new Date(before);
      }
    }

    return MessageModel.find(query)
      .sort({ createdAt: sortOrder })
      .limit(limitMessages)
      .then((messages) => messages.map(transformMessage));
  },
};

export { messagesService };
