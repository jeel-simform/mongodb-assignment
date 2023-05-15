const express = require("express");
const router = express.Router();

const Post = require("../model/Post");
const auth = require("../middleware/auth");
const checkId = require("../middleware/checkId");

router.post("/post", auth, async (req, res) => {
  try {
    // console.log(req.body);
    const { title, description } = req.body;
    // console.log(req.user.);
    const post = await Post.create({
      title,
      description,
      creator: req.user._id,
    });
    console.log(post);
    res.status(200).json({
      post,
    });
  } catch (err) {}
});

router.get("/myposts", auth, async (req, res) => {
  try {
    // const { id } = req.params;
    // console.log(req.user.user._id);
    const post = await Post.find({ creator: req.user._id });
    res.json({
      post,
    });
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
});

router.get("/mypost/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.find({ creator: req.user._id, _id: id });
    res.json({
      post,
    });
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
});

router.get("/posts", async (req, res) => {
  try {
    const { page, limit, ...filter } = req.query;
    const skip = (page - 1) * limit;
    const post = await Post.find(filter).limit(limit).skip(skip);
    res.status(200).json({
      post,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/total-post", async (req, res) => {
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
    res.status(200).json({
      post,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/projection-sort", async (req, res) => {
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

    res.status(200).json({
      post,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/posts-search", async (req, res) => {
  try {
    const { search } = req.query;
    const posts = await Post.find({ $text: { $search: search } });

    res.status(200).json({
      posts,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.put("/post/:id", auth, checkId, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidator: true,
    });
    return res.status(200).json({
      post,
    });
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
});

router.delete("/post/:id", auth, checkId, async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    return res.status(200).json({
      message: "post deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
});

module.exports = router;
