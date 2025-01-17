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
    shouldReverse = false,
    limit,
    after,
    before,
  }: {
    sortOrder: 1 | -1;
    shouldReverse: boolean;
    limit: number;
    after: string | undefined;
    before: string | undefined;
  }): Promise<Message[]> {
    const query: FilterQuery<MessageInternal> = {};

    if (after || before) {
      const createdAtQuery: { $gt?: Date; $lt?: Date } = {};
      if (after) {
        createdAtQuery.$gt = new Date(after);
      }
      if (before) {
        createdAtQuery.$lt = new Date(before);
      }
      query.createdAt = createdAtQuery;
    }

    let messages = await MessageModel.find(query)
      .sort({ createdAt: sortOrder })
      .limit(limit)
      .lean()
      .then((messages) => messages.map(transformMessage));

    if (shouldReverse) {
      messages = messages.reverse();
    }

    return messages;
  },
};

export { messagesService };
