import { Router, Request, Response, NextFunction } from 'express';
import { body, query, validationResult } from 'express-validator';
import { randomUUID } from 'crypto';

import { Message, GetMessagesQuery, CreateMessageBody } from '../types';
import { CONFIG } from '../config';

const messagesRouter = Router();

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
      const now = new Date();

      const newMessage: Message = {
        id: randomUUID(),
        message,
        author,
        timestamp: now.toISOString(),
      };

      messages.push(newMessage);

      res.status(201).json(newMessage);
    } catch (err) {
      next(err);
    }
  }
);

// Get messages
messagesRouter.get(
  '/',
  [
    query('limit').optional().isInt({ min: 1 }),
    query('since')
      .optional()
      .isISO8601()
      .withMessage('Invalid timestamp format'),
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

      const { limit, since } = req.query;

      const limitMessages = limit
        ? parseInt(limit, 10)
        : CONFIG.defaultMessagesLimit;

      const result = since
        ? messages
            .filter((msg) => msg.timestamp > new Date(since).toISOString())
            .slice(-limitMessages)
        : messages.slice(-limitMessages);

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

export { messagesRouter };
