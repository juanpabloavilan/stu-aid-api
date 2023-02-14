const { Strategy } = require("passport-local");
const bcrypt = require("bcrypt");
const boom = require("@hapi/boom");
const UserService = require("../../../services/user.service");

const User = new UserService();

const localStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const user = await User.findByEmail(email);
      if (!user) return done(boom.unauthorized(), false);
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(boom.unauthorized(), false);
      return done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = localStrategy;
