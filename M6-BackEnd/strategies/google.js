const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const Author = require("../modules/authors/schema");
const jwt = require("jsonwebtoken");
const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ["profile", "email"],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;

      let author = await Author.findOne({
        $or: [{ googleID: profile.id }, { email: email }],
      });
      if (!author) {
        author = new Author({
          name: profile.name.givenName,
          surname: profile.name.familyName,
          email: profile.emails[0].value,
          googleID: profile.id,
        });
        await author.save();
      } else if (!author.googleID) {
        author.googleID = profile.id;
        await author.save();
      }
      const token = jwt.sign({ id: author._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      done(null, { token });
    } catch (e) {
      done(e);
    }
  },
);

module.exports = googleStrategy;
