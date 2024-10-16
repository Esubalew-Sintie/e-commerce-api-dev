module.exports = {
  // express
  port: 5000,

  // bcrypt
  saltRounds: 10,

  // postgrsql
  DATABASE_URL: "postgresql://myuser:mypassword@localhost:5432/ecommerce",

  // JWT
  accessTokenTtl: "3h",
  refreshTokenTtl: "10h",
  verificationTokenTtl: "5m",
  passwordResetTokenTtl: "5m",
  accessTokenSecret: "ACCESS_TOKEN_SECRET",
  refreshTokenSecret: "REFRESH_TOKEN_SECRET",
  verificationSecret: "VERIFICATION_SECRET",
  passwordResetSecret: "PASSWORD_RESET_SECRET",

  // Cloudinary
  cloudinaryName: "CLOUDINARY_NAME",
  cloudinaryAPIKey: "CLOUDINARY_API_KEY",
  cloudinaryAPISecret: "CLOUDINARY_API_SECRET",

  // Redis
  redisPort: 6379,
  redisUrl: "redis://localhost:6379",
  redisHost: "127.0.0.1",
  verifyEmailEX: 300,
  verifyProductEX: 60,
  refreshTokenCacheEX: 1000,
  cartCacheEx: 2000,

  // Multer
  fileMaxSize: 2 * 1024 * 1024,

  // Rate Limiter
  window: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  maxRequest: 500, // Limit each IP to 100 requests per `window`
  rateLimitMessage: "You have exceeded the 500 requests in 24 hrs limit!",

  
};
