/* eslint-disable no-underscore-dangle */
const User = require("../model/User");
const { messages } = require("../utils/constant");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        error: "username or email or password is required",
      });
    }
    const user = await User.create({
      username,
      email,
      password,
    });
    const token = await user.generateAuthToken();
    return res.success(messages.USER_CREATED, { user, token });
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: "email and password are required",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    const token = await user.generateAuthToken();
    return res.success(messages.LOGIN_SUCCESS, { user, token });
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
    if (!updatedUser) {
      return res.status.json({
        message: "User not found",
      });
    }
    return res.success(messages.UPDATE_SUCCESS, updatedUser);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  register,
  login,
  updateUser,
};
