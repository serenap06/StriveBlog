const express = require("express");
const authorController = require("./controller");
const uploadImg = require("../../middlewares/cloudinary");
const router = express.Router();

//routes
router.get("/", authorController.findAll); //GET all authors
router.get("/:authorId", authorController.findOne); //GET one author

router.post("/", authorController.create); //POST one author

router.patch("/:authorId", authorController.update);
router.patch(
  "/:authorId/avatar",
  uploadImg.single("avatar"),
  authorController.uploadAvatar,
);

router.delete("/:authorId", authorController.deleteAuthor);

module.exports = router;
