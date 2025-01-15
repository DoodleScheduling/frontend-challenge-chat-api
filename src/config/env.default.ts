const DEFAULT_CONFIG = {
  api: {
    version: 'v1',
    url: 'http://localhost',
    messagesLimit: 50,
  },
  app: {
    port: 3000,
    corsOrigin: '*',
    corsMethods: 'GET,POST,OPTIONS',
    env: 'development',
  },
  auth: {
    token: 'super-secret-doodle-token',
  },
} as const;

export { DEFAULT_CONFIG };
