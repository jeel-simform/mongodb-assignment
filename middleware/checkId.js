// const jwt = require("jsonwebtoken");
const Post = require("../model/Post");

const checkId = async (req, res, next) => {
  try {
    // console.log("checkid");
    const { id } = req.params;

    const post = Post.findById(id);
    if (post.creator === req.user._id) {
      next();
    } else {
      throw new Error("you have no permissions to update another user post");
    }
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};
module.exports = checkId;
