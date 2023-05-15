const User = require("../model/User");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({
      username,
      email,
      password,
    });
    const token = await user.generateAuthToken();
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    // console.log(token);
    res.cookie("jwt", token, cookieOptions);
    res.status(200).json({
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        message: "please provide email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    // console.log("user in lign", user);

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(404).json({
        message: "invalid credentials",
      });
    }
    const token = await user.generateAuthToken();
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    // console.log(token);
    res.cookie("jwt", token, cookieOptions);
    res.status(200).json({
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({
      updatedUser,
    });
  } catch (err) {
    console.log();
  }
};

module.exports = {
  register,
  login,
  updateUser,
};