export const CONFIG = {
  port: process.env.PORT || 3000,
  defaultMessagesLimit: 50,
  api: {
    version: 'v1',
    baseRoute: '/api',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
} as const;
