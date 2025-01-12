import { Router } from 'express';

import { validateBody, validateQuery } from './validation';
import { createMessageSchema, getMessagesQuerySchema } from '../../schemas';
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
