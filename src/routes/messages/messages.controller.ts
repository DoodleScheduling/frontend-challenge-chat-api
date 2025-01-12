import { Request, Response, NextFunction } from 'express';

import { Message, CreateMessageBody, GetMessagesQuery } from '../../types';
import { createMessageSchema, getMessagesQuerySchema } from '../../schemas';
import { messagesService } from './messages.service';

const messagesController = {
  createMessage(
    req: Request<object, Message, CreateMessageBody>,
    res: Response,
    next: NextFunction
  ): void {
    try {
      const validatedData = createMessageSchema.parse(req.body);
      const newMessage = messagesService.createMessage(validatedData);
      res.status(201).json(newMessage);
    } catch (err) {
      next(err);
    }
  },

  getMessages(
    req: Request<object, Message[], unknown, GetMessagesQuery>,
    res: Response,
    next: NextFunction
  ): void {
    try {
      const validatedQuery = getMessagesQuerySchema.parse(req.query);
      const messages = messagesService.getMessages(
        validatedQuery.limit,
        validatedQuery.since
      );
      res.status(200).json(messages);
    } catch (err) {
      next(err);
    }
  },
};

export { messagesController };
