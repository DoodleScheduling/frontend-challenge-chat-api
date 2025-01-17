import { FilterQuery } from 'mongoose';

import { Message, MessageInternal, CreateMessageBody } from '../../types';
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
    limit: number;
    since: string | undefined;
    before: string | undefined;
  }): Promise<Message[]> {
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
      .limit(limit)
      .then((messages) => messages.map(transformMessage));
  },
};

export { messagesService };
