require("dotenv").config();
const express = require("express");
const initDataBaseConnection = require("./config/db");
const cors = require("cors");
const PORT = 9091;


//import global middleware
const logger = require("./middlewares/logger");
const checkApi = require("./middlewares/checkApi");
const authenticate = require("./middlewares/authenticate");


//server
const server = express();
server.use(express.json());
server.use(cors());
server.use(logger)
const passport = require("passport");
server.use(passport.initialize())
const googleStrategy = require("./strategies/google");
passport.use(googleStrategy)

//import routes
const authRouter = require("./modules/auth/routes");
server.use("/auth", authRouter);
server.use(authenticate);
const authorsRoute = require("./modules/authors/routes");
server.use("/authors", authorsRoute);
const blogPostsRoute = require("./modules/blogPosts/routes");
server.use("/blogPosts", blogPostsRoute);
const commentsRoute= require("./modules/comments/routes");
server.use("/blogPosts", commentsRoute);


const startServer = async (port, server) => {
  await initDataBaseConnection();
  server.listen(port, () => {
    console.log(`Server un and running on port ${port}`);
  });
};

startServer(PORT, server);
