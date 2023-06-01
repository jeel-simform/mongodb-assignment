const User = require("../model/User");
const {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
} = require("./userSchema");

const { Error } = require("../utils/error");

const uniqueFieldChecker = async (req, res, next) => {
  const user = await User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  });

  if (user) {
    if (user.email === req.body.email) {
      return Error(res, 400, "User with email already exists");
    }

    if (user.userName === req.body.userName) {
      return Error(res, 400, "User with email already exists");
    }
  }

  return next();
};

const registerValidator = async (req, res, next) => {
  const { error } = registerUserSchema.validate(req.body);

  if (error) {
    return Error(res, 404, error.details[0].message);
  }

  return next();
};

const updateValidator = async (req, res, next) => {
  const { error } = updateUserSchema.validate(req.body);

  if (error) {
    return Error(res, 404, error.details[0].message);
  }

  return next();
};

const loginValidator = async (req, res, next) => {
  const { error } = loginUserSchema.validate(req.body);

  if (error) {
    return Error(res, 404, error.details[0].message);
  }

  return next();
};

module.exports = {
  registerValidator,
  updateValidator,
  uniqueFieldChecker,
  loginValidator,
};
