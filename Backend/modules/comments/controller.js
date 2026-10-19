// Comments controller
const { default: mongoose } = require("mongoose");
const commentService = require("./service");

const findAllComments = async (req, res, next) => {
  const { blogPostId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid Id",
      });
    }
    const comments = await commentService.findAllComments(blogPostId);
    if (!comments) {
      return res.status(404).send({
        statusCode: 404,
        message: "No comments found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      comments,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const findOneComment = async (req, res, next) => {
  const { blogPostId, commentId } = req.params;
  try {
    if (
      !mongoose.Types.ObjectId.isValid(commentId) ||
      !mongoose.Types.ObjectId.isValid(blogPostId)
    ) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid Id",
      });
    }
    const comment = await commentService.findOneComment(commentId, blogPostId);
    if (!comment) {
      return res.status(404).send({
        statusCode: 404,
        message: "Comment not found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      comment,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const createComment = async (req, res, next) => {
  const { blogPostId } = req.params;
  const { text } = req.body;

  const authorId = req.user?._id || req.author?._id;
  try {
    if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid Id",
      });
    }
    const comment = await commentService.createComment({ text, author:authorId}, blogPostId);
    if (!comment) {
      return res.status(404).send({
        statusCode: 404,
        message: "No Comments found",
      });
    }
    res.status(201).send({
      statusCode: 201,
      message: "Comment created successfully",
      comment,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateComment = async (req, res, next) => {
  const { commentId } = req.params;
  const { text } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid Id",
      });
    }
    const updatedComment = await commentService.updateComment(commentId, {
      text,
    });
    if (!updatedComment) {
      return res.status(404).send({
        statusCode: 404,
        message: "Comment not found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      message: "Comment updated successfully",
      updatedComment,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const deleteComment = async (req, res, next) => {
  const { commentId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid Id",
      });
    }
    const result = await commentService.deleteComment(commentId);
    if (!result) {
      return res.status(404).send({
        statusCode: 404,
        message: "Comment not found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      message: "Comment deleted successfully",
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  findAllComments,
  findOneComment,
  createComment,
  updateComment,
  deleteComment,
};
