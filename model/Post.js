const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title must be required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "description must be required"],
    trim: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

postSchema.index({ description: "text" });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
