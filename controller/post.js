/* eslint-disable no-underscore-dangle */
const Post = require("../model/Post");

const createPost = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const post = await Post.create({
      title,
      description,
      creator: req.user._doc._id,
    });
    return res.success("post created successfully", post);
  } catch (err) {
    return next(err);
  }
};

const myPosts = async (req, res, next) => {
  try {
    const post = await Post.find({ creator: req.user._id });
    return res.success("Your All post", post);
  } catch (err) {
    return next(err);
  }
};
const myPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.find({ creator: req.user._id, _id: id });
    return res.success("Your Post", post);
  } catch (err) {
    return next(err);
  }
};

const allPosts = async (req, res, next) => {
  try {
    const { page, limit, ...filter } = req.query;
    const skip = (page - 1) * limit;
    const post = await Post.find(filter).limit(limit).skip(skip);
    return res.success("All post", post);
  } catch (err) {
    return next(err);
  }
};

const countPost = async (req, res, next) => {
  try {
    const post = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $group: {
          _id: "$creator",
          username: { $first: "$user.username" },
          NumberOfPost: { $sum: 1 },
        },
      },
    ]);
    return res.success("Count Post", post);
  } catch (err) {
    return next(err);
  }
};
const projectionPost = async (req, res, next) => {
  try {
    const { field, sort } = req.query;
    const projection = {};

    if (field) {
      const fields = field.split(",");
      fields.forEach((f) => {
        projection[f] = 1;
      });
    } else {
      projection._id = 1;
      projection.title = 1;
      projection.description = 1;
      projection.creator = 1;
    }
    const post = await Post.aggregate([
      {
        $project: projection,
      },
      {
        $sort: {
          [sort]: 1,
        },
      },
    ]);
    return res.success("project post", post);
  } catch (err) {
    return next(err);
  }
};
const searchPost = async (req, res, next) => {
  try {
    const { search } = req.query;
    const posts = await Post.find({ $text: { $search: search } });
    return res.success("", posts);
  } catch (err) {
    return next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidator: true,
    });
    return res.success("", post);
  } catch (err) {
    return next(err);
  }
};
const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    return res.success("Post deleted successfully");
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createPost,
  myPosts,
  myPost,
  allPosts,
  countPost,
  projectionPost,
  searchPost,
  updatePost,
  deletePost,
};
