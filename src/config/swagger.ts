import { CONFIG } from './config.js';
import { VALIDATION_CONFIG } from './validation.js';

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
    schemas: {
      Message: {
        type: 'object',
        required: ['_id', 'message', 'author', 'createdAt'],
        properties: {
          _id: {
            type: 'string',
            description: 'Unique identifier for the message',
            example: '123e4567-e89b-12d3-a456-426614174000',
          },
          message: {
            type: 'string',
            description: 'The content of the chat message',
            minLength: VALIDATION_CONFIG.message.minLength,
            maxLength: VALIDATION_CONFIG.message.maxLength,
            example: 'Hello everyone!',
          },
          author: {
            type: 'string',
            description:
              'Name of the message author. Can contain letters, numbers, spaces, hyphens, and underscores only.',
            minLength: VALIDATION_CONFIG.author.minLength,
            maxLength: VALIDATION_CONFIG.author.maxLength,
            pattern: '^[a-zA-Z0-9\\s-_]+$',
            example: 'John Smith',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description:
              'ISO 8601 timestamp indicating when the message was created',
            example: '2024-01-12T10:30:00Z',
          },
        },
      },
      CreateMessageRequest: {
        type: 'object',
        required: ['message', 'author'],
        properties: {
          message: {
            type: 'string',
            description: 'The content of the chat message to be created',
            minLength: VALIDATION_CONFIG.message.minLength,
            maxLength: VALIDATION_CONFIG.message.maxLength,
            example: 'Hello everyone!',
          },
          author: {
            type: 'string',
            description:
              'Name of the message author. Must be between 1-50 characters and can only contain letters, numbers, spaces, hyphens, and underscores.',
            minLength: VALIDATION_CONFIG.author.minLength,
            maxLength: VALIDATION_CONFIG.author.maxLength,
            pattern: '^[a-zA-Z0-9\\s-_]+$',
            example: 'John Smith',
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Brief description of the error that occurred',
            example: 'Invalid message format',
          },
          details: {
            type: 'array',
            description:
              'Detailed information about validation errors or specific issues',
            items: {
              type: 'object',
              properties: {
                msg: {
                  type: 'string',
                  description:
                    'Specific error message explaining what went wrong',
                  example: 'Message cannot exceed 500 characters',
                },
                param: {
                  type: 'string',
                  description: 'The parameter or field that caused the error',
                  example: 'message',
                },
                location: {
                  type: 'string',
                  description:
                    'Where the error occurred (body, query, params, etc.)',
                  example: 'body',
                },
              },
            },
          },
        },
      },
      InternalServerError: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            description: 'Internal server error details',
            properties: {
              message: {
                type: 'string',
                description:
                  'Error message describing the internal server error',
                example: 'Internal Server Error',
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'ISO 8601 timestamp when the error occurred',
                example: '2024-01-12T10:30:00Z',
              },
            },
          },
        },
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
        description:
          'Retrieve a list of chat messages with optional filtering by time range and pagination support.',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            in: 'query',
            name: 'after',
            schema: {
              type: 'string',
              format: 'date-time',
            },
            required: false,
            description:
              'ISO 8601 timestamp to retrieve messages created after this time. Cannot be used together with "before" parameter.',
            example: '2024-01-12T10:30:00Z',
          },
          {
            in: 'query',
            name: 'limit',
            schema: {
              type: 'integer',
              minimum: 1,
              maximum: VALIDATION_CONFIG.message.maxLimit,
              default: CONFIG.api.defaultMessagesLimit,
            },
            required: false,
            description: `Maximum number of messages to return. Must be between 1 and ${VALIDATION_CONFIG.message.maxLimit.toString()}. Defaults to ${CONFIG.api.defaultMessagesLimit.toString()}.`,
          },
          {
            in: 'query',
            name: 'before',
            schema: {
              type: 'string',
              format: 'date-time',
            },
            required: false,
            description:
              'ISO 8601 timestamp to retrieve messages created before this time. Cannot be used together with "after" parameter.',
            example: '2024-01-12T15:45:00Z',
          },
        ],
        responses: {
          '200': {
            description: 'Successfully retrieved list of messages',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  description:
                    'Array of chat messages matching the query criteria',
                  items: {
                    $ref: '#/components/schemas/Message',
                  },
                },
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
            description: 'Bad request due to invalid query parameters',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  error: 'Invalid query parameters',
                  details: [
                    {
                      msg: 'Invalid timestamp format',
                      param: 'after',
                      location: 'query',
                    },
                    {
                      msg: 'Limit must be a positive integer',
                      param: 'limit',
                      location: 'query',
                    },
                    {
                      msg: 'Cannot use both "after" and "before" parameters simultaneously.',
                      param: 'before',
                      location: 'query',
                    },
                  ],
                },
              },
            },
          },
          '500': {
            description:
              'Internal server error occurred while processing the request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/InternalServerError',
                },
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
        description:
          'Create a new chat message with the specified content and author information.',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          description: 'Message data to create a new chat message',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateMessageRequest',
              },
              example: {
                message: 'Hello everyone!',
                author: 'John Smith',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Message successfully created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Message',
                },
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
            description:
              'Bad request due to invalid message format or validation errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
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
            description:
              'Internal server error occurred while creating the message',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/InternalServerError',
                },
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
