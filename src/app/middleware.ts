import { Application } from 'express';
import cors from 'cors';
import compression from 'compression';
import express from 'express';

import { CONFIG } from '../config';
import { timeoutHandler } from '../middleware/timeout';

const setupMiddleware = (app: Application): void => {
  app.use(
    cors({
      origin: CONFIG.cors.origin,
      methods: CONFIG.cors.methods,
    })
  );
  app.use(compression());
  app.use(express.json());
  app.use(timeoutHandler);
};

export { setupMiddleware };
