/* eslint-disable no-underscore-dangle */
const Post = require("../model/Post");
const { sendResponse } = require("../utils/success");
const { error } = require("../utils/error");

const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = await Post.create({
      title,
      description,
      creator: req.user._id,
    });
    return sendResponse(res, 200, post);
  } catch (err) {
    return error(res, 500, err.message);
  }
};

const myPosts = async (req, res) => {
  try {
    const post = await Post.find({ creator: req.user._id });

    return sendResponse(res, 200, post);
  } catch (err) {
    return error(res, 500, err.message);
  }
};
const myPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.find({ creator: req.user._id, _id: id });
    return sendResponse(res, 200, post);
  } catch (err) {
    return error(res, 500, err.message);
  }
};

const allPosts = async (req, res) => {
  try {
    const { page, limit, ...filter } = req.query;
    const skip = (page - 1) * limit;
    const post = await Post.find(filter).limit(limit).skip(skip);
    return sendResponse(res, 200, post);
  } catch (err) {
    return error(res, 500, err.message);
  }
};

const countPost = async (req, res) => {
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
    return sendResponse(res, 200, post);
  } catch (err) {
    return error(res, 500, err.message);
  }
};
const projectionPost = async (req, res) => {
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
    return sendResponse(res, 200, post);
  } catch (err) {
    return error(res, 500, err.message);
  }
};
const searchPost = async (req, res) => {
  try {
    const { search } = req.query;
    const posts = await Post.find({ $text: { $search: search } });
    return sendResponse(res, 200, posts);
  } catch (err) {
    return error(res, 500, err.message);
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidator: true,
    });
    return sendResponse(res, 200, post);
  } catch (err) {
    return error(res, 500, err.message);
  }
};
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    return sendResponse(res, 200, "post deleted successfully");
  } catch (err) {
    return error(res, 500, err.message);
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
