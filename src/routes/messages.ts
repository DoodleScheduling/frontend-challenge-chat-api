import { Router, Request, Response, NextFunction } from 'express';
import { body, query, validationResult } from 'express-validator';
import { randomUUID } from 'crypto';

import { Message, GetMessagesQuery, CreateMessageBody } from '../types';
import { CONFIG } from '../config';

const messagesRouter = Router();

// In memory storage for messages, in real world scenario this should be replaced with a database
const messages: Message[] = [];

const validateMessage = [
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message cannot be empty')
    .isLength({ max: 500 })
    .withMessage('Message cannot exceed 500 characters'),
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author cannot be empty')
    .isLength({ max: 50 })
    .withMessage('Author name cannot exceed 50 characters')
    .matches(/^[a-zA-Z0-9\s-_]+$/)
    .withMessage('Author name contains invalid characters'),
];

// Get messages
messagesRouter.get(
  '/',
  [
    query('limit').optional().isInt({ min: 1 }),
    query('since').optional().isInt({ min: 0 }),
  ],
  (
    req: Request<object, Message[], unknown, GetMessagesQuery>,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          error: 'Invalid query parameters',
          details: errors.array(),
        });
        return;
      }

      const limit = req.query.limit
        ? parseInt(req.query.limit, 10)
        : CONFIG.defaultMessagesLimit;
      const since = parseInt(req.query.since || '0', 10);

      const filteredMessages = messages
        .filter((msg) => msg.timestamp > since)
        .slice(-limit);

      res.status(200).json(filteredMessages);
    } catch (err) {
      next(err);
    }
  }
);

// Create message
messagesRouter.post(
  '/',
  validateMessage,
  (
    req: Request<object, Message, CreateMessageBody>,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          error: 'Invalid message format',
          details: errors.array(),
        });
        return;
      }

      const { message, author } = req.body;

      const newMessage: Message = {
        id: randomUUID(),
        message,
        author,
        timestamp: Date.now(),
      };
      messages.push(newMessage);

      res.status(201).json(newMessage);
    } catch (err) {
      next(err);
    }
  }
);

export { messagesRouter };
