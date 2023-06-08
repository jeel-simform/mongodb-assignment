const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: "User",
  },
});

postSchema.index({ description: "text" });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
