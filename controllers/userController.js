const {
  createUser,
  fetchUserByEmail,

  setUserRefreshToken,
} = require("../services/userService");
const { generateRefreshToken ,generateAccessToken} = require("../utils/jwt");
const {
  generateHashedPassword,
  compareHashedPassword,
} = require("../utils/hash");
const { Unauthorized, BadRequest } = require("../utils/Errors");

module.exports.signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await fetchUserByEmail(email);

    if (user) {
      throw new BadRequest("User already has an account");
    }

    const hashedPassword = await generateHashedPassword(password);
    const newUser = await createUser(username, email, hashedPassword);

  

    res.status(200).json({
      success: true,
      message: "User successfully registered",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await fetchUserByEmail(email);

    console.log(
      "user",
      user,
      await compareHashedPassword(password, user.password),
      password
    );

    if (!user || !(await compareHashedPassword(password, user.password))) {
      throw new Unauthorized("Invalid email or password");
    }

    const accessToken = generateAccessToken(user.email, user.id, user.role);
    const refreshToken = generateRefreshToken(user.email, user.id, user.role);
    await setUserRefreshToken(email, refreshToken);

    res.status(200).json({
      success: true,
      message: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};
