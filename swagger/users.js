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

const invalidUserData = {
  description: "Invalid Data provided",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "The fields email and password are required",
          },
        },
      },
    },
  },
};

const userSignUpBody = {
  type: "object",
  properties: {
    email: {
      type: "string",
      example: "user@example.com",
    },
    password: {
      type: "string",
      example: "password123",
    },
    username: {
      type: "string",
      example: "user123",
    },
  },
};

const userLoginBody = {
  type: "object",
  properties: {
    email: {
      type: "string",
      example: "user@example.com",
    },
    password: {
      type: "string",
      example: "password123",
    },
  },
};

const security = [
  {
    bearerAuth: [],
  },
];

const registerUser = {
  tags: ["User"],
  description: "Registers a new user",
  operationId: "registerUser",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/userSignUpBody",
        },
      },
    },
    required: true,
  },
  responses: {
    201: {
      description: "User registered successfully!",
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
                example: "User registered successfully!",
              },
            },
          },
        },
      },
    },
    400: invalidUserData,
    500: internalServerError,
  },
};

const loginUser = {
  tags: ["User"],
  description: "Logs in a user",
  operationId: "loginUser",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/userLoginBody",
        },
      },
    },
    required: true,
  },
  responses: {
    200: {
      description: "User logged in successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true,
              },
              access_token: {
                type: "string",
                example: "jwt.token.here",
              },
              message: {
                type: "string",
                example: "Login successful",
              },
            },
          },
        },
      },
    },
    400: invalidUserData,
    500: internalServerError,
  },
};

module.exports = {
  registerUser,
  loginUser,
  userSignUpBody,
  userLoginBody,
};
