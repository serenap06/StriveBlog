const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
    },
    surname: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    googleID: {
      type: String,
      unique: true,
      sparse: true,
    },
    dob: {
      type: String,
      required: false,
      default: null,
    },
    avatar: {
      type: String,
      required: false,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogPost",
        default: [],
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
  },
  { timestamps: true, strict: true },
);
// criptaggio password
authorSchema.pre("save", async function () {
  if (!this.password || !this.isModified("password")) {
    return;
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (e) {
    throw e;
  }
});

module.exports = mongoose.model("Author", authorSchema, "authors");
