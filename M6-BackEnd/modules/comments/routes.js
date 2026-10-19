const express = require("express");
const router = express.Router();
const commentController = require("./controller");

// comments routes
router.get("/:blogPostId/comments", commentController.findAllComments); // GET all comments of a specific blogPost
router.get(
  "/:blogPostId/comments/:commentId",
  commentController.findOneComment,
); // GET a specific comment of a specific blogPost

router.post("/:blogPostId/comments", commentController.createComment); // POST one comment to a specific blogPost

router.patch(
  "/:blogPostId/comments/:commentId",
  commentController.updateComment,
); // PATCH/EDIT a specific comment of a blogPost

router.delete("/:blogPostId/comments/:commentId", commentController.deleteComment); // DELETE a specific comment of a blogPost

module.exports = router;
