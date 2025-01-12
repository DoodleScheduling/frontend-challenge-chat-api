import { Application } from 'express';

import { messagesRouter } from '../routes/messages';
import { healthRouter } from '../routes/health';
import { docsRouter } from '../routes/docs';
import { CONFIG } from '../config';

const setupApiRoutes = (app: Application): void => {
  app.use(`${CONFIG.api.route}/messages`, messagesRouter);
};

const setupUtilityRoutes = (app: Application): void => {
  // Health Check
  app.use('/health', healthRouter);
  // API Documentation
  app.use(`${CONFIG.api.route}/docs`, docsRouter);
};

const setupRoutes = (app: Application): void => {
  setupUtilityRoutes(app);
  setupApiRoutes(app);
};

export { setupRoutes };
