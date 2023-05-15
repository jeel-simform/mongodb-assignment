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
  projection,
  searchPost,
  updatePost,
  deletePost,
} = require("../controller/post");

router.post("/post", auth, createPostValidator, createPost);

router.get("/myPosts", auth, myPosts);

router.get("/myPost/:id", auth, myPost);

router.get("/posts", allPosts);

router.get("/total-post", countPost);

router.get("/projection-sort", projection);

router.get("/posts-search", searchPost);

router.put("/post/:id", auth, checkId, updatePostValidator, updatePost);

router.delete("/post/:id", auth, checkId, deletePost);

module.exports = router;
