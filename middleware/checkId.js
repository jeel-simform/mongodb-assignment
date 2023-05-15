const Post = require("../model/Post");
const { error } = require("../utils/error");

const checkId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = Post.findById(id);
    // eslint-disable-next-line no-underscore-dangle
    if (post.creator === req.user._id) {
      return next();
    }
    throw new Error("you have no permissions to update another user post");
  } catch (err) {
    return error(res, 404, err.message);
  }
};
module.exports = checkId;
