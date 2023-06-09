const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const checkId = require("../middleware/checkId");
const {
  createPostValidator,
  updatePostValidator,
} = require("../validations/postValidator");

const {
  createPost,
  myPosts,
  myPost,
  allPosts,
  countPost,
  projectionPost,
  searchPost,
  updatePost,
  deletePost,
} = require("../controller/post");

router.post("/post", auth, createPostValidator, createPost);

router.get("/my-posts", auth, myPosts);

router.get("/myPost/:id", auth, myPost);

router.get("/posts", allPosts);

router.get("/total-post", countPost);

router.get("/projection-sort", projectionPost);

router.get("/posts-search", searchPost);

router.put("/post/:id", auth, checkId, updatePostValidator, updatePost);

router.delete("/post/:id", auth, checkId, deletePost);

module.exports = router;
