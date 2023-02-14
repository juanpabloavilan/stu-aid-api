const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;
      delete user.dataValues.password;
      const payload = {
        sub: user.id,
        username: user.email,
      };
      const token = jwt.sign(payload, config.jwtSecret);
      return res.json({ token, user });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
