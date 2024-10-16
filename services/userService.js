const { User } = require("../models/DBInit");
const { cacheClient } = require("../cache/cacheDBInit");
const {
  getVerifyEmailEX,
  getRefreshTokenCacheEX,
} = require("../utils/Configs");

module.exports.createUser = async (username, email, password) => {
  return await User.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });
};

module.exports.fetchUserByEmail = async (email) => {
  return await User.findUnique({
    where: {
      email: email,
    },
  });
};

module.exports.fetchUserById = async (userId) => {
  return await User.findUnique({
    where: {
      id: userId,
    },
  });
};

// Refresh token
module.exports.setUserRefreshToken = async (email, refreshToken) => {
  const refreshTokenCacheEX = getRefreshTokenCacheEX();
  await cacheClient.set(email, refreshToken, { EX: refreshTokenCacheEX });
};

module.exports.getUserRefreshToken = async (email) => {
  return await cacheClient.get(email);
};

module.exports.deleteUserRefreshToken = async (email) => {
  await cacheClient.del(email);
};
