const DEFAULT_CONFIG = {
  api: {
    version: 'v1',
    url: 'https://localhost',
    messagesLimit: 50,
  },
  app: {
    port: 3000,
    corsOrigin: '*',
    corsMethods: 'GET,POST,OPTIONS',
    env: 'development',
  },
} as const;

export { DEFAULT_CONFIG };
