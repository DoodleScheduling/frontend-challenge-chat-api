import { env } from './env';

// Hardcoded token for simplicity. In a real world application, we should use a more secure method.
const AUTH_TOKEN = 'super-secret-doodle-token';

const CONFIG = {
  port: env.PORT,
  env: env.NODE_ENV,
  cors: {
    origin: env.CORS_ORIGIN,
    methods: env.CORS_METHODS.split(','),
  },
  api: {
    version: env.API_VERSION,
    url: env.API_URL,
    route: `/api/${env.API_VERSION}`,
    defaultMessagesLimit: env.DEFAULT_MESSAGES_LIMIT,
    timeoutErrorDelay: 15000, // 15 seconds
  },
  auth: {
    token: AUTH_TOKEN,
  },
  mongodb: {
    uri: env.MONGODB_URI,
  },
} as const;

export { CONFIG };
export { SWAGGER_DOCUMENT } from './swagger';
export { VALIDATION_CONFIG } from './validation';
