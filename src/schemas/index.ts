import { z } from 'zod';

import { VALIDATION_CONFIG } from '../config';

const authorSchema = z
  .string()
  .trim()
  .min(VALIDATION_CONFIG.author.minLength, {
    message: `Author must be at least ${VALIDATION_CONFIG.author.minLength} characters`,
  })
  .max(VALIDATION_CONFIG.author.maxLength, {
    message: `Author cannot exceed ${VALIDATION_CONFIG.author.maxLength} characters`,
  })
  .regex(/^[\w\s-]+$/, {
    message:
      'Author can only contain letters, numbers, spaces, hyphens, and underscores',
  });

const messageSchema = z.object({
  id: z.string().uuid(),
  message: z
    .string()
    .trim()
    .min(VALIDATION_CONFIG.message.minLength, {
      message: 'Message cannot be empty',
    })
    .max(VALIDATION_CONFIG.message.maxLength, {
      message: `Message cannot exceed ${VALIDATION_CONFIG.message.maxLength} characters`,
    }),
  author: authorSchema,
  timestamp: z.string().datetime(),
});

const createMessageSchema = z.object({
  message: z
    .string()
    .trim()
    .min(VALIDATION_CONFIG.message.minLength, 'Message cannot be empty')
    .pipe(
      z
        .string()
        .max(
          VALIDATION_CONFIG.message.maxLength,
          `Message cannot exceed ${VALIDATION_CONFIG.message.maxLength} characters`
        )
    ),
  author: authorSchema,
});

const getMessagesQuerySchema = z.object({
  limit: z
    .union([z.string().regex(/^\d+$/).transform(Number), z.number()])
    .optional()
    .refine(
      (val) => val === undefined || val > 0,
      'Limit must be greater than 0'
    ),
  since: z.string().datetime('Invalid timestamp format').optional(),
});

const apiErrorSchema = z.object({
  message: z.string(),
  statusCode: z.number(),
  name: z.string(),
  stack: z.string().optional(),
});

export {
  messageSchema,
  createMessageSchema,
  getMessagesQuerySchema,
  apiErrorSchema,
};
