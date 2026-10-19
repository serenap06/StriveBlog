const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Author = require("../authors/schema");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const author = await Author.findOne({ email }).select("+password");
    if (!author) {
      return res.status(401).send({
        statusCode: 401,
        message: "Invalid credentials",
      });
    }
    const result = await bcrypt.compare(password, author.password);
    if (!result) {
      return res.status(401).send({
        statusCode: 401,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      {
        id: author._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
    res.status(200).send({
      statusCode: 200,
      token,
    });
  } catch (e) {
    return res.status(500).send({
      statusCode: 500,
      message: "Error",
    });
  }
};

const me = async (req, res) => {
  res.status(200).send(req.author);
};

module.exports = {
  login,
  me,
};
