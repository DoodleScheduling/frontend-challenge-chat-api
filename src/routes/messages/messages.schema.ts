import { z } from 'zod';

import { VALIDATION_CONFIG } from '../../config';
import { createMessageSchema } from '../../schemas';

const validatedCreateMessageSchema = createMessageSchema.extend({
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
});

export { validatedCreateMessageSchema };
