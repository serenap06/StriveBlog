const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
    },
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
    },
    content: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    cover: {
      type: String,
      required: false,
      default:"https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop"
    },
    readTime: {
      value: { type: Number },
      unit: { type: String },
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
  },
  { timestamps: true, strict: true },
);

module.exports = mongoose.model("BlogPost", blogPostSchema, "blogPosts");
