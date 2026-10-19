const Author = require("./schema");

const findAll = async () => {
  return await Author.find().populate(["posts", "comments"]);
};

const findOne = async (authorId) => {
  return await Author.findById(authorId);
};
const create = async (body) => {
  const author = new Author(body);
  return await author.save();
};
const update = async (authorId, body) => {
  return await Author.findByIdAndUpdate(authorId, body, {
    returnDocument: "after",
    runValidators: true,
  });
};
const deleteAuthor = async (authorId) => {
  return await Author.findByIdAndDelete(authorId);
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  deleteAuthor,
};
