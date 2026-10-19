const express = require("express");
const authRouter = express.Router();
const authController = require("./controller");
const authenticate = require("../../middlewares/authenticate");
const passport = require("passport");
//routes
authRouter.get("/me", authenticate, authController.me);
authRouter.post("/login", authController.login);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req,res)=>{
    res.redirect(`${process.env.FRONTEND_URL}/login?token=${req.user.token}`)
  }
);
module.exports = authRouter;
