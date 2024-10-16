const internalServerError = {
  description: "Internal Server Error",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: false,
          },
          message: {
            type: "string",
            example: "Internal Server Error",
          },
        },
      },
    },
  },
};

const orderNotFound = {
  description: "Order not found",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: false,
          },
          message: {
            type: "string",
            example: "Order not found",
          },
        },
      },
    },
  },
};

const orderBody = {
  type: "object",
  properties: {
    order_id: {
      type: "string",
      example: "123e4567-e89b-12d3-a456-426614174000", // Example UUID of the user
      description: "Unique identifier for the Order",
    },
    user_id: {
      type: "string",
      example: "123e4567-e89b-12d3-a456-426614174000", // Example UUID of the user
      description: "Unique identifier for the user placing the order",
    },
    products: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "987e4567-e89b-12d3-a456-426614174002", // Example UUID of the product
            description: "Unique identifier for the product being ordered",
          },
          quantity: {
            type: "integer",
            example: 2,
            description: "Quantity of the product being ordered",
          },
        },
      },
      example: [
        {
          id: "987e4567-e89b-12d3-a456-426614174002",
          quantity: 2,
        },
        {
          id: "123e4567-e89b-12d3-a456-426614174003",
          quantity: 1,
        },
      ],
      description:
        "List of products in the order, each with id and quantity",
    },
    total_price: {
      type: "number",
      example: 299.99,
      description: "Total price for the order",
    },
    status: {
      type: "string",
      example: "pending",
      description: "Status of the order (e.g., pending, completed, shipped)",
    },
    created_at: {
      type: "string",
      format: "date-time",
      example: "2024-10-01T12:34:56Z",
      description: "Timestamp when the order was created",
    },
  },
};

const security = [
  {
    bearerAuth: [],
  },
];

const setOrder = {
  tags: ["Orders"],
  description: "Set a new order",
  operationId: "setOrder",
  security: security,
  requestBody: {
    content: {
      "application/json": {
        schema: orderBody,
      },
    },
  },
  responses: {
    200: {
      description: "Order placed successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true,
              },
              message: {
                type: "string",
                example: "Order has been placed successfully",
              },
            },
          },
        },
      },
    },
    404: orderNotFound,
    500: internalServerError,
  },
};

const getOrders = {
  tags: ["Orders"],
  description: "Get a list of orders for the authenticated user",
  operationId: "getOrders",
  security: security,
  responses: {
    200: {
      description: "List of orders retrieved successfully",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: orderBody, // Array of orders
          },
        },
      },
    },
    500: internalServerError,
  },
};

const getOrderById = {
  tags: ["Orders"],
  description: "Get details of a specific order",
  operationId: "getOrderById",
  security: security,
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "string",
        example: "123e4567-e89b-12d3-a456-426614174000", // Example order ID
      },
      description: "Unique identifier for the order",
    },
  ],
  responses: {
    200: {
      description: "Order details retrieved successfully",
      content: {
        "application/json": {
          schema: orderBody,
        },
      },
    },
    404: orderNotFound,
    500: internalServerError,
  },
};

module.exports = {
  setOrder,
  getOrders,
  getOrderById,
  orderBody,
};
