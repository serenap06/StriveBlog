const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  blogPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogPost",
  },
});

module.exports = mongoose.model("Comment", commentSchema, "comments");
