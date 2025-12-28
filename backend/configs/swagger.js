import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Careveli API Documentation",
      version: "1.0.0",
      description: "API documentation for Careveli E-commerce backend",
      contact: {
        name: "Careveli Team",
      },
    },
    servers: [
      {
        url: "http://localhost:8088",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              example: "john@example.com",
            },
            password: {
              type: "string",
              example: "password123",
            },
          },
        },
        Product: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "T-Shirt",
            },
            description: {
              type: "string",
              example: "Comfortable cotton t-shirt",
            },
            price: {
              type: "number",
              example: 299,
            },
            category: {
              type: "string",
              example: "Men",
            },
            subCategory: {
              type: "string",
              example: "Topwear",
            },
            sizes: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["S", "M", "L", "XL"],
            },
            bestseller: {
              type: "boolean",
              example: true,
            },
          },
        },
        Cart: {
          type: "object",
          properties: {
            itemId: {
              type: "string",
              example: "64a1b2c3d4e5f6789012345",
            },
            size: {
              type: "string",
              example: "M",
            },
            quantity: {
              type: "number",
              example: 2,
            },
          },
        },
        Order: {
          type: "object",
          properties: {
            items: {
              type: "array",
              items: {
                type: "object",
              },
            },
            amount: {
              type: "number",
              example: 599,
            },
            address: {
              type: "object",
              properties: {
                firstName: {
                  type: "string",
                  example: "John",
                },
                lastName: {
                  type: "string",
                  example: "Doe",
                },
                email: {
                  type: "string",
                  example: "john@example.com",
                },
                street: {
                  type: "string",
                  example: "123 Main St",
                },
                city: {
                  type: "string",
                  example: "New York",
                },
                state: {
                  type: "string",
                  example: "NY",
                },
                zipcode: {
                  type: "string",
                  example: "10001",
                },
                country: {
                  type: "string",
                  example: "USA",
                },
                phone: {
                  type: "string",
                  example: "1234567890",
                },
              },
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Operation successful",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Error message",
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
  },
  apis: ["./routes/*.js"], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
