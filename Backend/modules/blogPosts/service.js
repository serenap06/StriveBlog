const BlogPost = require("./schema");
const Author = require("../authors/schema");

const findAll = async () => {
  return await BlogPost.find().populate("author");
};

const findOne = async (blogPostId) => {
  return await BlogPost.findById(blogPostId).populate("author");
};
const create = async (postData) => {
  console.log(postData)
  const blogPost = new BlogPost(postData);
  const savedPost = await blogPost.save();

  if (savedPost.author) {
    await Author.updateOne(
      {
        _id: savedPost.author,
      },
      {
        $push: {
          posts: savedPost._id ,
        },
      },
    );
  }

  return savedPost;
};

const update = async (blogPostId, updateData) => {
  return await BlogPost.findByIdAndUpdate(blogPostId, updateData, {
    new: true,
    runValidators: true,
  });
};
const deleteBlogPost = async (blogPostId) => {
  const deletedPost = await BlogPost.findByIdAndDelete(blogPostId);
  if (deletedPost.author) {
    await Author.updateOne(
      {
        _id: deletedPost.author,
      },
      {
        $pull: {
          posts: deletedPost._id ,
        },
      },
    );
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  deleteBlogPost,
};
