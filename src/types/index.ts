import { z } from 'zod';

import {
  messageSchema,
  createMessageSchema,
  getMessagesQuerySchema,
  apiErrorSchema,
} from '../schemas';

type Message = z.infer<typeof messageSchema>;
type CreateMessageBody = z.infer<typeof createMessageSchema>;
type GetMessagesQuery = z.infer<typeof getMessagesQuerySchema>;
type ApiError = z.infer<typeof apiErrorSchema>;

export type { Message, CreateMessageBody, GetMessagesQuery, ApiError };
