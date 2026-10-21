const { default: mongoose } = require("mongoose");
const blogPostService = require("./service");

// Posts Controller
const findAll = async (req, res, next) => {
  try {
    const blogPosts = await blogPostService.findAll();
    if (!blogPosts) {
      return res.status(404).send({
        statusCode: 404,
        message: "No Posts found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      blogPosts,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const findOne = async (req, res, next) => {
  const { blogPostId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid Id",
      });
    }
    const blogPost = await blogPostService.findOne(blogPostId);
    if (!blogPost) {
      return res.status(404).send({
        statusCode: 404,
        message: "No Post found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      blogPost,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { category, title, content, cover} = req.body;
  try {
    const blogPost = await blogPostService.create({
      category,
      title,
      content,
      cover,
      author: req.author,
    });
    res.status(201).send({
      statusCode: 201,
      message: "Post saved successfully",
      blogPost,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  const { blogPostId } = req.params;
  try {
    const { category, title, content } = req.body;
    if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid Id",
      });
    }
    const updateData = { category, title, content };
    const blogPostUpdated = await blogPostService.update(
      blogPostId,
      updateData,
    );
    if (!blogPostUpdated) {
      return res.status(404).send({
        statusCode: 404,
        message: "Post not found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      message: "Post updated successfully",
      blogPostUpdated,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const uploadCover = async (req, res, next) => {
  const { blogPostId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid id",
      });
    }
    if (!req.file) {
      return res.status(400).send({
        statusCode: 400,
        message: "File not uploaded",
      });
    }
    const body = { cover: req.file.path };
    const blogPost = await blogPostService.update(blogPostId, body);
    if (!blogPost) {
      return res.status(404).send({
        statusCode: 404,
        message: "Post not found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      message: "Cover uploaded successfully",
      blogPost,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const deleteBlogPost = async (req, res, next) => {
  const { blogPostId } = req.params;
  const currentAuthorId = req.author;
  try {
    if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid id",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(currentAuthorId)) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid id",
      });
    }
    const post = await blogPostService.findOne(blogPostId)
    if (!post) {
      return res.status(404).send({
        statusCode: 404,
        message: "Post not found",
      });
    }
    const postAuthorId = post.author._id ? post.author._id.toString() : post.author.toString();
    if (postAuthorId !== currentAuthorId.toString()) {
      return res.status(403).send({
        statusCode: 403,
        message: "Non sei autorizzato a cancellare questo post",
      });
    }
    const deletedPost = await blogPostService.deleteBlogPost(blogPostId);
    if (!deletedPost) {
      return res.status(404).send({
        statusCode: 404,
        message: "Post not found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      message: "Post deleted successfully",
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  uploadCover,
  deleteBlogPost,
};
