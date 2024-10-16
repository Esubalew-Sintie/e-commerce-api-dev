const {
  loginUser,
  registerUser,
  userLoginBody,
  userSignUpBody,
} = require("./users");
const {
  setProduct,
  productBody,
  getProduct,
  getProductsWithPagination,
  searchProducts,
  updateProduct,
  removeProduct,
} = require("./products");
const { setOrder, orderBody, getOrders, getOrderById } = require("./orders");

const apiDocumentation = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "E-Commerce API - Documentation",
    contact: {
      name: "Esubalew Sintie",
      email: "esubalewsintie1302@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:5000/docs",
      description: "Local Server",
    },
  ],
  tags: [{ name: "User" }, { name: "Products" }, { name: "Orders" }],
  paths: {
    "/auth/signup": {
      post: registerUser,
    },
    "/auth/login": {
      post: loginUser,
    },
    "/products": {
      post: setProduct,
      get: getProductsWithPagination,
    },
    "/products/{productId}": {
      get: getProduct,
      put: updateProduct,
      delete: removeProduct,
    },
    "/orders": {
      post: setOrder,
      get: getOrders,
    },
    "/orders/{id}": {
      get: getOrderById,
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      userSignUpBody,
      userLoginBody,
      productBody,
      orderBody,
    },
  },
};

module.exports = { apiDocumentation };
