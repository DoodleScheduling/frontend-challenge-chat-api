import { Application } from 'express';

import { authMiddleware } from '../middleware/auth.js';
import { messagesRouter } from '../routes/messages/index.js';
import { healthRouter } from '../routes/health/index.js';
import { docsRouter } from '../routes/docs/index.js';
import { CONFIG } from '../config/index.js';

const setupApiRoutes = (app: Application): void => {
  app.use(`${CONFIG.api.route}/messages`, authMiddleware, messagesRouter);
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
