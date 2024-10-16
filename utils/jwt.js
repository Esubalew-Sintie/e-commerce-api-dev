
const { sign, verify } = require("jsonwebtoken");

const {
  getAccessTokenSecret,
  getRefreshTokenSecret,
  getVerificationSecret,
  getAccessTokenTtl,
  getRefreshTokenTtl,
} = require("./Configs");

const accessTokenSecret = getAccessTokenSecret();
const refreshTokenSecret = getRefreshTokenSecret();
const verificationSecret = getVerificationSecret();

const accessTokenTtl = getAccessTokenTtl();
const refreshTokenTtl = getRefreshTokenTtl();

module.exports.generateAccessToken = (email, id, role) => {
  const payload = { email: email, id: id, role: role };
  const secret = accessTokenSecret;
  const options = { expiresIn: accessTokenTtl };
  const token = sign(payload, secret, options);
  return token;
};

module.exports.generateRefreshToken = (email, id, role) => {
  const payload = { email: email, id: id, role: role };
  const secret = refreshTokenSecret;
  const options = { expiresIn: refreshTokenTtl };
  const token = sign(payload, secret, options);
  return token;
};

module.exports.decodeAccessToken = (accessToken) => {
  return verify(accessToken, accessTokenSecret);
};

module.exports.decodeRefreshToken = (refreshToken) => {
  return verify(refreshToken, refreshTokenSecret);
};

module.exports.decodeVerificationToken = (verificationToken) => {
  return verify(verificationToken, verificationSecret);
};

module.exports.getTokenFromTokenHeader = (tokenHeader) => {
  return tokenHeader.split(" ")[1].trim();
};
