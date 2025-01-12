import { Router } from 'express';

import { validateBody, validateQuery } from '../../middleware/validation';
import { createMessageSchema, getMessagesQuerySchema } from './messages.schema';
import { messagesController } from './messages.controller';

const messagesRouter = Router();

messagesRouter.post(
  '/',
  validateBody(createMessageSchema),
  messagesController.createMessage
);

messagesRouter.get(
  '/',
  validateQuery(getMessagesQuerySchema),
  messagesController.getMessages
);

export { messagesRouter };
