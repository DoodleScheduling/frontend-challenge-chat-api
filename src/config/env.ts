import 'dotenv/config';
import { z } from 'zod';

import { DEFAULT_CONFIG } from './env.default';

const envSchema = z.object({
  // API Configuration
  API_VERSION: z.string().default(DEFAULT_CONFIG.api.version),
  API_URL: z.string().default(DEFAULT_CONFIG.api.url),
  DEFAULT_MESSAGES_LIMIT: z.coerce
    .number()
    .positive()
    .default(DEFAULT_CONFIG.api.messagesLimit),
  CORS_ORIGIN: z.string().default(DEFAULT_CONFIG.app.corsOrigin),
  CORS_METHODS: z.string().default(DEFAULT_CONFIG.app.corsMethods),

  // App Configuration
  PORT: z.coerce.number().positive().default(DEFAULT_CONFIG.app.port),
  NODE_ENV: z
    .enum(['development', 'preproduction', 'production'])
    .default(DEFAULT_CONFIG.app.env),
});

const env = envSchema.parse(process.env);

export { env };
