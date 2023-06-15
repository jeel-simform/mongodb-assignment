const Post = require("../model/Post");

const authId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    // eslint-disable-next-line no-underscore-dangle
    if (post.creator.toString() === req.user._id) {
      return next();
    }
    throw new Error("you have no permissions to update another user post");
  } catch (err) {
    return next(err);
  }
};
module.exports = authId;
