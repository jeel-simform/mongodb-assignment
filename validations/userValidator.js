const User = require("../model/User");
const {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
} = require("./userSchema");

const uniqueFieldChecker = async (req, res, next) => {
  const user = await User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  });

  if (user) {
    if (user.email === req.body.email) {
      return res
        .status(400)
        .json({ error: "User with this email already Exist." });
    }

    if (user.userName === req.body.userName) {
      return res
        .status(400)
        .json({ error: "User with this userName already Exist." });
    }
  }

  return next();
};

const registerValidator = async (req, res, next) => {
  const { error } = registerUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  return next();
};

const updateValidator = async (req, res, next) => {
  const { error } = updateUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  return next();
};

const loginValidator = async (req, res, next) => {
  const { error } = loginUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  return next();
};

module.exports = {
  registerValidator,
  updateValidator,
  uniqueFieldChecker,
  loginValidator,
};
