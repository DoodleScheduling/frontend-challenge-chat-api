import { Request, Response, NextFunction } from 'express';
import { Message, CreateMessageBody, GetMessagesQuery } from '../../types';
import { messagesService } from './messages.service';

const messagesController = {
  createMessage(
    req: Request<object, Message, CreateMessageBody>,
    res: Response,
    next: NextFunction
  ): void {
    try {
      const newMessage = messagesService.createMessage(req.body);
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
      const { limit, since } = req.query;
      const messages = messagesService.getMessages(limit, since);
      res.status(200).json(messages);
    } catch (err) {
      next(err);
    }
  },
};

export { messagesController };
