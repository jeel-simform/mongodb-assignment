/* eslint-disable no-underscore-dangle */
const User = require("../model/User");
const { sendResponse } = require("../utils/success");
const { Error } = require("../utils/error");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({
      username,
      email,
      password,
    });
    const token = await user.generateAuthToken();
    // const cookieOptions = {
    //   expires: new Date(
    //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    //   ),
    //   httpOnly: true,
    // };
    // res.cookie("jwt", token, cookieOptions);
    return sendResponse(res, 200, { user, token });
  } catch (err) {
    return Error(res, 500, err.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendResponse(res, 404, "please provide email and password");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return Error(res, 404, "Invalid credentials");
    }
    const token = await user.generateAuthToken();
    // const cookieOptions = {
    //   expires: new Date(
    //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    //   ),
    //   httpOnly: true,
    // };
    // res.cookie("jwt", token, cookieOptions);
    return sendResponse(res, 200, { user, token });
  } catch (err) {
    return Error(res, 500, err.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    return sendResponse(res, 200, updatedUser);
  } catch (err) {
    return Error(res, 500, err.message);
  }
};

module.exports = {
  register,
  login,
  updateUser,
};
