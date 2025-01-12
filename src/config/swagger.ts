import { CONFIG } from './index';
import { VALIDATION_CONFIG } from './validation';

const SWAGGER_DOCUMENT = {
  openapi: '3.0.0',
  info: {
    title: "Doodle's Chat API",
    version: CONFIG.api.version,
    description: 'API for handling chat messages',
  },
  servers: [
    {
      url: `${CONFIG.api.url}:${CONFIG.port}${CONFIG.api.route}`,
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
                    message: 'Grüezi mitenand',
                    author: 'Hans Müller',
                    timestamp: '2024-01-12T10:30:00Z',
                  },
                  {
                    id: '123e4567-e89b-12d3-a456-426614174001',
                    message: 'Hallo zäme',
                    author: 'Fritz Meier',
                    timestamp: '2024-01-12T10:35:00Z',
                  },
                  {
                    id: '123e4567-e89b-12d3-a456-426614174002',
                    message: 'Salut tout le monde',
                    author: 'Marie Dubois',
                    timestamp: '2024-01-12T10:40:00Z',
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
                    {
                      msg: 'Limit must be a positive integer',
                      param: 'limit',
                      location: 'query',
                    },
                  ],
                },
              },
            },
          },
          '500': {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                example: {
                  error: {
                    message: 'Internal Server Error',
                    timestamp: '2024-01-12T10:30:00Z',
                  },
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
                    minLength: VALIDATION_CONFIG.message.minLength,
                    maxLength: VALIDATION_CONFIG.message.maxLength,
                    example: 'Grüezi mitenand',
                  },
                  author: {
                    type: 'string',
                    minLength: VALIDATION_CONFIG.author.minLength,
                    maxLength: VALIDATION_CONFIG.author.maxLength,
                    pattern: '^[a-zA-Z0-9\\s-_]+$',
                    example: 'Hans Müller',
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
                  message: 'Grüezi mitenand',
                  author: 'Hans Müller',
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
                      msg: `Message cannot exceed ${VALIDATION_CONFIG.message.maxLength} characters`,
                      param: 'message',
                      location: 'body',
                    },
                    {
                      msg: 'Author name contains invalid characters',
                      param: 'author',
                      location: 'body',
                    },
                  ],
                },
              },
            },
          },
          '500': {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                example: {
                  error: {
                    message: 'Internal Server Error',
                    timestamp: '2024-01-12T10:30:00Z',
                  },
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
