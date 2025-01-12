import { env } from './env';

const CONFIG = {
  port: env.PORT,
  env: env.NODE_ENV,
  cors: {
    origin: env.CORS_ORIGIN,
    methods: env.CORS_METHODS.split(','),
  },
  api: {
    version: env.API_VERSION,
    url: `${env.API_URL}:${env.PORT}`,
    route: `/api/${env.API_VERSION}`,
    defaultMessagesLimit: env.DEFAULT_MESSAGES_LIMIT,
  },
} as const;

export { CONFIG };
export { SWAGGER_DOCUMENT } from './swagger';
