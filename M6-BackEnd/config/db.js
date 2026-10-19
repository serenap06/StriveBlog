const mongoose = require("mongoose");
require("dotenv").config;

const initDataBaseConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected successfully");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

module.exports = initDataBaseConnection;
