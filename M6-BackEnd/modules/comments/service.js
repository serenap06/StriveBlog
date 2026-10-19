const BlogPost = require("../blogPosts/schema");
const Author = require("../authors/schema");
const Comment = require("./schema");

const findAllComments = async (blogPostId) => {
  return await Comment.find({ blogPost: blogPostId }).populate("author");
};
const findOneComment = async (commentId) => {
  return await Comment.findById(commentId).populate("author");
};
const createComment = async (commentData, blogPostId) => {
  const newComment = new Comment({ ...commentData, blogPost: blogPostId });
  const savedComment = await newComment.save();
  await BlogPost.findByIdAndUpdate(blogPostId, {
    $push: { comments: savedComment._id },
  });
  return savedComment;
};
const updateComment = async (commentId, updateData) => {
  return await Comment.findByIdAndUpdate(commentId, updateData, {
    new: true,
    runValidators: true,
  });
};
const deleteComment = async (commentId) => {
  const deletedComment = await Comment.findByIdAndDelete(commentId);
  if (!deletedComment) {
    return null;
  }
  if (deletedComment.author) {
    await Author.updateOne(
      {
        _id: deletedComment.author,
      },
      {
        $pull: {
          comments: deletedComment._id,
        },
      },
    );
  }
  if (deletedComment.blogPost) {
    await BlogPost.updateOne(
      {
        _id: deletedComment.blogPost,
      },
      {
        $pull: {
          comments: deletedComment._id,
        },
      },
    );
  }
  return deletedComment;
};

module.exports = {
  findAllComments,
  findOneComment,
  createComment,
  updateComment,
  deleteComment,
};
