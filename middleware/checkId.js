const Post = require("../model/Post");
const { error } = require("../utils/error");

const checkId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = Post.findById(id);
    if (post.creator === req.user._id) {
      next();
    } else {
      throw new Error("you have no permissions to update another user post");
    }
  } catch (err) {
    return error(res, 404, err.message);
  }
};
module.exports = checkId;
