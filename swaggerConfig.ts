const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'OZmap teste API with TypeScript',
    version: '1.0.0',
    description: 'Esse são as requets do OZmap teste API',
  },
  servers: [
    {
      url: 'http://localhost:3002',
      description: 'development',
    },
  ],
  paths: {
    '/user': {
      get: {
        summary: 'List all users',
        parameters: [
          {
            name: 'page',
            in: 'query',
            required: false,
            schema: {
              type: 'integer',
              default: 1,
            },
          },
          {
            name: 'limit',
            in: 'query',
            required: false,
            schema: {
              type: 'integer',
              default: 10,
            },
          },
        ],
        responses: {
          '200': {
            description: 'A list of users.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'User created successfully',
          },
          '400': {
            description: 'Invalid input',
          },
        },
      },
    },
    '/user/{id}': {
      get: {
        summary: 'Get a user by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'User details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          '404': {
            description: 'User not found',
          },
        },
      },
      put: {
        summary: 'Update a user by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserUpdateInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'User updated successfully',
          },
          '404': {
            description: 'User not found',
          },
        },
      },
    },
    '/region': {
      post: {
        summary: 'Create a new region',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Region',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Region created',
          },
          '400': {
            description: 'Bad Request',
          },
        },
      },
      get: {
        summary: 'List all regions',
        responses: {
          '200': {
            description: 'A list of regions',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Region',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/region/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      get: {
        summary: 'Get a region by ID',
        responses: {
          '200': {
            description: 'Region details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Region',
                },
              },
            },
          },
          '404': {
            description: 'Region not found',
          },
        },
      },
      put: {
        summary: 'Update a region by ID',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Region',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Region updated',
          },
          '404': {
            description: 'Region not found',
          },
        },
      },
      delete: {
        summary: 'Delete a region by ID',
        responses: {
          '204': {
            description: 'Region deleted',
          },
          '404': {
            description: 'Region not found',
          },
        },
      },
    },
    '/region/containsPoint': {
      post: {
        summary: 'List regions containing a given point',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Point',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'List of regions containing the point',
          },
        },
      },
    },
    '/region/nearPoint': {
      post: {
        summary: 'List regions near a given point',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  point: {
                    $ref: '#/components/schemas/Point',
                  },
                  distance: {
                    type: 'number',
                    description: 'Distance in meters',
                  },
                },
                required: ['point', 'distance'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'List of regions near the point',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          address: { type: 'string', nullable: true },
          coordinates: {
            type: 'object',
            properties: {
              lat: { type: 'number' },
              lng: { type: 'number' },
            },
          },
        },
      },
      UserInput: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          address: { type: 'string', nullable: true },
          coordinates: {
            type: 'object',
            properties: {
              lat: { type: 'number', nullable: true },
              lng: { type: 'number', nullable: true },
            },
          },
        },
      },
      UserUpdateInput: {
        type: 'object',
        properties: {
          name: { type: 'string', nullable: true },
          email: { type: 'string', nullable: true },
          address: { type: 'string', nullable: true },
          coordinates: {
            type: 'object',
            properties: {
              lat: { type: 'number', nullable: true },
              lng: { type: 'number', nullable: true },
            },
            nullable: true,
          },
        },
      },
      Region: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'Region identifier',
          },
          name: {
            type: 'string',
            description: 'Region name',
          },
        },
        required: ['name'],
      },
      Point: {
        type: 'object',
        properties: {
          latitude: {
            type: 'number',
            format: 'double',
          },
          longitude: {
            type: 'number',
            format: 'double',
          },
        },
        required: ['latitude', 'longitude'],
      },
    },
  },
};

export default swaggerDocument;
