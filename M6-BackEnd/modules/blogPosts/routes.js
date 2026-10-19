const express = require("express");
const blogPostController = require("./controller");
const uploadImg = require("../../middlewares/cloudinary");
const router = express.Router();

// blogPosts routes
router.get("/", blogPostController.findAll); // GET all blogPosts
router.get("/:blogPostId", blogPostController.findOne); // GET one blogPost

router.post("/", blogPostController.create); // POST one blogPost

router.patch("/:blogPostId", blogPostController.update); // PATCH/EDIT a specific blogPost
router.patch(
  "/:blogPostId/cover",
  uploadImg.single("cover"),
  blogPostController.uploadCover,
); // PATCH/EDIT a blogPost cover

router.delete("/:blogPostId", blogPostController.deleteBlogPost); // DELETE a blogPost

module.exports = router;
