import { z } from 'zod';

import { VALIDATION_CONFIG } from '../config';

const messageSchema = z.object({
  id: z.string().uuid(),
  message: z
    .string()
    .trim()
    .min(VALIDATION_CONFIG.message.minLength)
    .max(VALIDATION_CONFIG.message.maxLength),
  author: z
    .string()
    .trim()
    .min(VALIDATION_CONFIG.author.minLength)
    .pipe(
      z
        .string()
        .max(VALIDATION_CONFIG.author.maxLength)
        .regex(/^[a-zA-Z0-9\s-_]+$/)
    ),
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
  author: z
    .string()
    .trim()
    .min(VALIDATION_CONFIG.author.minLength, 'Author cannot be empty')
    .pipe(
      z
        .string()
        .max(
          VALIDATION_CONFIG.author.maxLength,
          `Author name cannot exceed ${VALIDATION_CONFIG.author.maxLength} characters`
        )
        .regex(/^[a-zA-Z0-9\s-_]+$/, 'Author name contains invalid characters')
    ),
});

const getMessagesQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .refine((val) => !val || /^\d+$/.test(val), 'Limit must be a valid number')
    .transform((val) => (val ? Number(val) : undefined))
    .pipe(
      z
        .number()
        .optional()
        .refine(
          (val) => val === undefined || val > 0,
          'Limit must be greater than 0'
        )
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
