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

const messageBaseSchema = {
  _id: z.string(),
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
};

const createMessageSchema = z.object({
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
});

const messageInternalSchema = z.object({
  ...messageBaseSchema,
  createdAt: z.date(),
});

const messageSchema = z.object({
  ...messageBaseSchema,
  createdAt: z.string().datetime(),
});

const getMessagesQuerySchema = z
  .object({
    limit: z
      .union([z.string().regex(/^\d+$/).transform(Number), z.number()])
      .optional()
      .refine(
        (val) =>
          val === undefined ||
          (val > 0 && val <= VALIDATION_CONFIG.message.maxLimit),
        `Limit must be a positive integer and cannot exceed ${VALIDATION_CONFIG.message.maxLimit}`
      ),
    since: z.string().datetime('Invalid timestamp format').optional(),
    before: z.string().datetime('Invalid timestamp format').optional(),
  })
  .refine((data) => !(data.since && data.before), {
    message: 'Cannot use both "since" and "before" parameters simultaneously.',
    path: ['before'],
  });

const apiErrorSchema = z.object({
  message: z.string(),
  statusCode: z.number(),
  name: z.string(),
  stack: z.string().optional(),
});

export {
  createMessageSchema,
  messageInternalSchema,
  messageSchema,
  getMessagesQuerySchema,
  apiErrorSchema,
};
