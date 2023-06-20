/* eslint-disable no-underscore-dangle */
const Post = require("../model/Post");
const { messages } = require("../utils/constant");

const createPost = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        error: "title and description are required",
      });
    }
    const post = await Post.create({
      title,
      description,
      creator: req.user._id,
    });
    return res.success(messages.POST_CREATED, post);
  } catch (err) {
    return next(err);
  }
};

const myPosts = async (req, res, next) => {
  try {
    const post = await Post.find({ creator: req.user._id });
    if (!post) {
      return res.notFound(messages.POST_NOT_FOUND);
    }
    return res.success(messages.POST_GET, post);
  } catch (err) {
    return next(err);
  }
};
const myPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.find({ creator: req.user._id, _id: id });
    if (!post) {
      return res.notFound(messages.POST_NOT_FOUND);
    }
    return res.success(messages.POST_GET, post);
  } catch (err) {
    return next(err);
  }
};

const allPosts = async (req, res, next) => {
  try {
    const { page, limit, ...filter } = req.query;
    const skip = (page - 1) * limit;
    const post = await Post.find(filter).limit(limit).skip(skip);
    if (!post) {
      return res.notFound(messages.POST_NOT_FOUND);
    }
    return res.success(messages.POST_GETS, post);
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
    if (!post) {
      return res.notFound(messages.POST_NOT_FOUND);
    }
    return res.success(messages.POST_GET, post);
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
    if (!post) {
      return res.notFound(messages.POST_NOT_FOUND);
    }
    return res.success(messages.POST_GET, post);
  } catch (err) {
    return next(err);
  }
};
const searchPost = async (req, res, next) => {
  try {
    const { search } = req.query;
    const posts = await Post.find({ $text: { $search: search } });
    if (!posts) {
      return res.notFound(messages.POST_NOT_FOUND);
    }
    return res.success(messages.POST_GET, posts);
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
    if (!post) {
      return res.notFound(messages.POST_NOT_FOUND);
    }
    return res.success(messages.POST_UPDATE, post);
  } catch (err) {
    return next(err);
  }
};
const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.notFound(messages.POST_NOT_FOUND);
    }
    return res.success(messages.POST_DELETE);
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
