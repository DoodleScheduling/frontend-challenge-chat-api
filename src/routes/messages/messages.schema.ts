import { z } from 'zod';

import { CreateMessageBody, GetMessagesQuery } from '../../types';

const createMessageSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, 'Message cannot be empty')
    .max(500, 'Message cannot exceed 500 characters'),
  author: z
    .string()
    .trim()
    .min(1, 'Author cannot be empty')
    .max(50, 'Author name cannot exceed 50 characters')
    .regex(/^[a-zA-Z0-9\s-_]+$/, 'Author name contains invalid characters'),
}) satisfies z.ZodType<CreateMessageBody>;

const getMessagesQuerySchema = z.object({
  limit: z.string().optional(),
  since: z.string().datetime('Invalid timestamp format').optional(),
}) satisfies z.ZodType<GetMessagesQuery>;

export { createMessageSchema, getMessagesQuerySchema };
