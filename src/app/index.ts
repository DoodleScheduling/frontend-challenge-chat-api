import express, { Application } from 'express';

import { setupMiddleware } from './middleware';
import { setupRoutes } from './routes';
import { setupErrorHandlers } from './error';

const createApp = (): Application => {
  const app = express();

  setupMiddleware(app);
  setupRoutes(app);
  setupErrorHandlers(app);

  return app;
};

export { createApp };
