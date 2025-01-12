import { z } from 'zod';
import { CreateMessageBody, GetMessagesQuery } from '../../types';
import { VALIDATION_CONFIG } from '../../config';

const createMessageSchema = z.object({
  message: z
    .string()
    .trim()
    .min(VALIDATION_CONFIG.message.minLength, 'Message cannot be empty')
    .max(
      VALIDATION_CONFIG.message.maxLength,
      `Message cannot exceed ${VALIDATION_CONFIG.message.maxLength} characters`
    ),
  author: z
    .string()
    .trim()
    .min(VALIDATION_CONFIG.author.minLength, 'Author cannot be empty')
    .max(
      VALIDATION_CONFIG.author.maxLength,
      `Author name cannot exceed ${VALIDATION_CONFIG.author.maxLength} characters`
    )
    .regex(/^[a-zA-Z0-9\s-_]+$/, 'Author name contains invalid characters'),
}) satisfies z.ZodType<CreateMessageBody>;

const getMessagesQuerySchema = z.object({
  limit: z.string().optional(),
  since: z.string().datetime('Invalid timestamp format').optional(),
}) satisfies z.ZodType<GetMessagesQuery>;

export { createMessageSchema, getMessagesQuerySchema };
