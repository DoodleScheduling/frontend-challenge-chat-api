import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import compression from 'compression';

import { messagesRouter } from './routes/messages';
import { swaggerDocument } from './swagger';
import { requestLogger } from './middleware/logger';
import { notFoundHandler, errorHandler } from './middleware/error';
import { timeoutHandler } from './middleware/timeout';
import { API_ROUTE } from './constants';
import { CONFIG } from './config';

export const createApp = (): Application => {
  const app = express();

  // Middleware
  app.use(requestLogger);
  app.use(
    cors({
      origin: CONFIG.cors.origin,
      methods: ['GET', 'POST', 'OPTIONS'],
    })
  );
  app.use(helmet());
  app.use(compression());
  app.use(express.json({ limit: '10kb' }));
  app.use(timeoutHandler);

  // Health Check
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      memory: process.memoryUsage(),
    });
  });

  // API Documentation
  app.use(
    `${API_ROUTE}/docs`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      customCss: '.swagger-ui .topbar { display: none }',
    })
  );

  // Routes
  app.use(`${API_ROUTE}/messages`, messagesRouter);

  // Error handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
