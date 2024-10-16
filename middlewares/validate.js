const {
  userSignUpValidation,
  userValidation,
  userEmailValidation,
} = require("../utils/userValidation");

const { productValidation } = require("../utils/productValidation");

const { BadRequest } = require("../utils/Errors");

module.exports.validateUserSignUp = (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const { error } = userSignUpValidation({
      username: username,
      email: email,
      password: password,
    });

    if (error) {
      const messages = error.details.map((error) => error.message);
      throw new BadRequest(messages);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports.validateUser = (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = userValidation({
      email: email,
      password: password,
    });

    if (error) {
      throw new BadRequest("Invalid Email or password");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports.validateUserEmail = (req, res, next) => {
  try {
    const { email } = req.body;
    const { error } = userEmailValidation({
      email: email,
    });

    if (error) {
      throw new BadRequest("Invalid Email");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports.validateProduct = (req, res, next) => {
  try {
    req.body.price = parseInt(req.body.price);
    req.body.stock = parseInt(req.body.stock);
    const { name, category, price, stock, desc } = req.body;
    const { error } = productValidation({
      name: name,
      category: category,
      price: price,
      stock: stock,
      desc: desc,
    });

    if (error) {
      const messages = error.details.map((error) => error.message);
      throw new BadRequest(messages);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
