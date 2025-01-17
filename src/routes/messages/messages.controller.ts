import { Request, Response, NextFunction } from 'express';

import { Message, CreateMessageBody, GetMessagesQuery } from '../../types';
import { messagesService } from './messages.service';

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
      const { limit, since, before } = req.query;
      const sortOrder = since ? 1 : -1;

      const messages = await messagesService.getMessages({
        sortOrder,
        limit,
        since,
        before,
      });

      res.status(200).json(messages);
    } catch (err) {
      next(err);
    }
  },
};

export { messagesController };
