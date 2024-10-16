const config = require('config');

// Bcrypt
module.exports.getSaltRounds = () => config.get('saltRounds');

// Port
module.exports.getPort = () => config.get('port');

// Redis
module.exports.getRedisHost = () => config.get('redisHost');
module.exports.getRedisPort = () => config.get('redisPort');
module.exports.getRedisUrl = () => config.get('redisUrl');
module.exports.getVerifyEmailEX = () => config.get('verifyEmailEX');
module.exports.getVerifyProductEX = () => config.get("verifyProductEX");

module.exports.getRefreshTokenCacheEX = () => config.get('refreshTokenCacheEX');


// JWT
module.exports.getAccessTokenSecret = () => config.get('accessTokenSecret');
module.exports.getRefreshTokenSecret = () => config.get('refreshTokenSecret');
module.exports.getVerificationSecret = () => config.get('verificationSecret');
module.exports.getPasswordResetSecret = () => config.get('passwordResetSecret');

module.exports.getAccessTokenTtl = () => config.get('accessTokenTtl');
module.exports.getRefreshTokenTtl = () => config.get('refreshTokenTtl');
module.exports.getVerificationTokenTtl = () => config.get('verificationTokenTtl');
module.exports.getPasswordResetTokenTtl = () => config.get('passwordResetTokenTtl');

// Cloudinary
module.exports.getCloudinaryName = () => config.get('cloudinaryName');
module.exports.getCloudinaryAPIKey = () => config.get('cloudinaryAPIKey');
module.exports.getCloudinaryAPISecret = () => config.get('cloudinaryAPISecret');


// Multer
module.exports.getFileMaxSize = () => config.get('fileMaxSize');

// Rate Limiter
module.exports.getWindow = () => config.get('window');
module.exports.getMaxRequest = () => config.get('maxRequest');
module.exports.getRateLimitMessage = () => config.get('rateLimitMessage');

