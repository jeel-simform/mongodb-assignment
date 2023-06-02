/* eslint-disable no-underscore-dangle */
const User = require("../model/User");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({
      username,
      email,
      password,
    });
    const token = await user.generateAuthToken();
    return res.success("user created successfully", { user, token });
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.missingCredentials("please provide email and password");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.validationError();
    }
    const token = await user.generateAuthToken();
    return res.success("login successfully", { user, token });
  } catch (err) {
    return next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.success("user updated successfully", updatedUser);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  register,
  login,
  updateUser,
};
