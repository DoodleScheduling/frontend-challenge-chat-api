import { CONFIG } from './';
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
      url: `${CONFIG.api.url}:${CONFIG.port.toString()}${CONFIG.api.route}`,
      description: `${CONFIG.env} server`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'token',
        description: `Enter the token value, e.g. ${CONFIG.auth.token}`,
      },
    },
  },
  security: [
    {
      bearerAuth: [],
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
        security: [
          {
            bearerAuth: [],
          },
        ],
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
          {
            in: 'query',
            name: 'before',
            schema: {
              type: 'string',
              format: 'date-time',
              description:
                'ISO 8601 timestamp to retrieve messages before this time',
            },
            required: false,
            example: '',
          },
        ],
        responses: {
          '200': {
            description: 'List of messages',
            content: {
              'application/json': {
                example: [
                  {
                    _id: '123e4567-e89b-12d3-a456-426614174000',
                    message: 'Hello everyone!',
                    author: 'John Smith',
                    createdAt: '2024-01-12T10:30:00Z',
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
                    {
                      msg: 'Cannot use both "since" and "before" parameters simultaneously.',
                      param: 'before',
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
                    createdAt: '2024-01-12T10:30:00Z',
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
        security: [
          {
            bearerAuth: [],
          },
        ],
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
                    example: 'Hello everyone!',
                  },
                  author: {
                    type: 'string',
                    minLength: VALIDATION_CONFIG.author.minLength,
                    maxLength: VALIDATION_CONFIG.author.maxLength,
                    pattern: '^[a-zA-Z0-9\\s-_]+$',
                    example: 'John Smith',
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
                  _id: '123e4567-e89b-12d3-a456-426614174000',
                  message: 'Hello everyone!',
                  author: 'John Smith',
                  createdAt: '2024-01-12T10:30:00Z',
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
                      msg: `Message cannot exceed ${VALIDATION_CONFIG.message.maxLength.toString()} characters`,
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
                    createdAt: '2024-01-12T10:30:00Z',
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
