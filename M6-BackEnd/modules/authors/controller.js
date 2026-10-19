const { default: mongoose } = require("mongoose");
const sendGrid = require("@sendgrid/mail");
const authorService = require("./service");
const bcrypt = require("bcrypt");

const findAll = async (req, res, next) => {
  try {
    const authors = await authorService.findAll();
    if (authors.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "No authors found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      authors,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const findOne = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid Id",
      });
    }
    const author = await authorService.findOne(authorId);
    if (!author) {
      return res.status(404).send({
        statusCode: 404,
        message: "No author found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      author,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { name, surname, email, password, dob, avatar } = req.body;
  try {
    const author = await authorService.create({
      name,
      surname,
      email,
      password,
      dob,
      avatar,
    });
    try {
      sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: author.email,
        from: "serenapoletano@gmail.com",
        subject: "Benvenuto su StriveBLog",
        text: "Ti sei registrato correttamente",
        html: "<h1>Benvenuto!</h1><p>Ti sei registrato correttamente</p>",
      };
      const [response] = await sendGrid.send(msg);
      console.log("Email inviata con status:", response.statusCode);
    } catch (emailError) {
      console.error("Errore nell'invio dell'email:", emailError);
    }

    res.status(201).send({
      statusCode: 201,
      message: "Author saved successfully",
      author,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const { body } = req;
    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid Id",
      });
    }
    const authorUpdated = await authorService.update(authorId, body);
    if (!authorUpdated) {
      return res.status(404).send({
        statusCode: 404,
        message: "Author not found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      message: "Author updated successfully",
      authorUpdated,
    });
  } catch (e) {
    next(e);
  }
};

const deleteAuthor = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid id",
      });
    }
    await authorService.deleteAuthor(authorId);
    return res.status(200).send({
      statusCode: 200,
      message: "Author deleted successfully",
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const uploadAvatar = async (req, res, next) => {
  const { authorId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(authorId)) {
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
    const body = { avatar: req.file.path };
    const author = await authorService.update(authorId, body);
    if (!author) {
      return res.status(404).send({
        statusCode: 404,
        message: "Author not found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      author,
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
  uploadAvatar,
  deleteAuthor,
};
