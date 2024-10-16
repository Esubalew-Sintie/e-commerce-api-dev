const {
  decodeAccessToken,
  decodeRefreshToken,
  getTokenFromTokenHeader,
} = require("../utils/jwt");
const { getUserRefreshToken } = require("../services/userService");
const { BadRequest, Forbidden, Unauthorized } = require("../utils/Errors");

module.exports.authorizeAccess = (req, res, next) => {
  try {
    const tokenHeader = req.header("Authorization");
    const token = getTokenFromTokenHeader(tokenHeader);
    const decoded = decodeAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TypeError") {
      next(new BadRequest("No token Provided"));
    } else if (error.name === "JsonWebTokenError") {
      next(new BadRequest("Invalid Token"));
    } else if (error.name === "TokenExpiredError") {
      next(new BadRequest("Token Expired"));
    } else {
      next(error);
    }
  }
};

module.exports.authorizeRefresh = async (req, res, next) => {
  try {
    const tokenHeader = req.header("Authorization");
    const token = getTokenFromTokenHeader(tokenHeader);
    const decoded = decodeRefreshToken(token);
    const tokenCache = await getUserRefreshToken(decoded.email);

    if (tokenCache === token) {
      req.user = decoded;
      next();
    } else {
      throw new Unauthorized("Invalid refresh token");
    }
  } catch (error) {
    console.log(error);
    if (error.name === "TypeError") {
      next(new BadRequest("No token Provided"));
    } else if (error.name === "JsonWebTokenError") {
      next(new BadRequest("Invalid Token"));
    } else if (error.name === "TokenExpiredError") {
      next(new BadRequest("Token Expired"));
    }
    next(error);
  }
};

module.exports.authorizeAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "ADMIN") {
      throw new Forbidden("Access Denied");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
