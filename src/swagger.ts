import { CONFIG } from './config';
import { API_ROUTE } from './constants';

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: "Doodle's Chat API",
    version: CONFIG.api.version,
    description: 'API for handling chat messages',
  },
  servers: [
    {
      url: `http://localhost:${CONFIG.port}${API_ROUTE}`,
      description: 'Development server',
    },
  ],
  tags: [
    {
      name: 'Messages',
      description: 'Operations for handling chat messages',
    },
  ],
  paths: {
    '/messages': {
      get: {
        tags: ['Messages'],
        summary: 'Get chat messages',
        parameters: [
          {
            in: 'query',
            name: 'since',
            schema: {
              type: 'integer',
              minimum: 0,
              description: 'Unix timestamp in ms',
            },
            required: false,
            example: 1521096352344,
          },
          {
            in: 'query',
            name: 'limit',
            schema: {
              type: 'integer',
              minimum: 1,
              default: 50,
            },
            required: false,
            description: 'Max messages to return',
          },
        ],
        responses: {
          '200': {
            description: 'List of messages',
            content: {
              'application/json': {
                example: [
                  {
                    id: '123e4567-e89b-12d3-a456-426614174000',
                    message: 'Hello world',
                    author: 'John Doe',
                    timestamp: 1521096352344,
                  },
                ],
              },
            },
          },
          '400': {
            description: 'Invalid query parameters',
            content: {
              'application/json': {
                example: {
                  error: 'Invalid query parameters',
                  details: [
                    {
                      msg: 'Invalid value',
                      param: 'limit',
                      location: 'query',
                    },
                  ],
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Messages'],
        summary: 'Create new message',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['message', 'author'],
                properties: {
                  message: {
                    type: 'string',
                    maxLength: 500,
                    example: 'Message text',
                  },
                  author: {
                    type: 'string',
                    maxLength: 50,
                    pattern: '^[a-zA-Z0-9\\s-_]+$',
                    example: 'Jane Doe',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Message created',
            content: {
              'application/json': {
                example: {
                  id: '123e4567-e89b-12d3-a456-426614174000',
                  message: 'Message text',
                  author: 'Jane Doe',
                  timestamp: 1521096352344,
                },
              },
            },
          },
          '400': {
            description: 'Invalid message format',
            content: {
              'application/json': {
                example: {
                  error: 'Invalid message format',
                  details: [
                    {
                      msg: 'Message cannot exceed 500 characters',
                      param: 'message',
                      location: 'body',
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  },
};

export { swaggerDocument };
