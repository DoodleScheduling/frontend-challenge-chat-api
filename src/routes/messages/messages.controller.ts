import { Request, Response, NextFunction } from 'express';

import { Message, CreateMessageBody, GetMessagesQuery } from '../../types/index.js';
import { CONFIG } from '../../config/index.js';
import { messagesService } from './messages.service.js';

const messagesController = {
  async createMessage(
    req: Request<object, Message, CreateMessageBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const newMessage = await messagesService.createMessage(req.body);

      res.status(201).json(newMessage);
    } catch (err) {
      next(err);
    }
  },

  async getMessages(
    req: Request<object, Message[], unknown, GetMessagesQuery>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { limit, after, before } = req.query;
      const sortOrder = after ? 1 : -1;
      const limitMessages = limit ?? CONFIG.api.defaultMessagesLimit;

      const messages = await messagesService.getMessages({
        sortOrder,
        limit: limitMessages,
        after,
        before,
      });

      res.status(200).json(messages);
    } catch (err) {
      next(err);
    }
  },
};

export { messagesController };
