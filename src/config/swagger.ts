import { CONFIG } from './';

const SWAGGER_DOCUMENT = {
  openapi: '3.0.0',
  info: {
    title: "Doodle's Chat API",
    version: CONFIG.api.version,
    description: 'API for handling chat messages',
  },
  servers: [
    {
      url: `${CONFIG.api.url}${CONFIG.api.route}`,
      description: `${CONFIG.env} server`,
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
              type: 'string',
              format: 'date-time',
              description: 'ISO 8601 timestamp',
            },
            required: false,
            example: '2024-01-12T10:30:00Z',
          },
          {
            in: 'query',
            name: 'limit',
            schema: {
              type: 'integer',
              minimum: 1,
              default: CONFIG.api.defaultMessagesLimit,
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
                    timestamp: '2024-01-12T10:30:00Z',
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
                      msg: 'Invalid timestamp format',
                      param: 'since',
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
                  timestamp: '2024-01-12T10:30:00Z',
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
} as const;

export { SWAGGER_DOCUMENT };
