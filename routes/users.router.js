const express = require("express");
const boom = require("@hapi/boom");
const router = express.Router();

const UserService = require("../services/user.service");

const {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
} = require("../schemas/user.schema");

const validatorHandler = require("../middlewares/validator.handler");

const User = new UserService();

/**
 * Ruta de usuarios
 * /users/
 */

//GET lista de usuarios.
router.get("/", async (req, res, next) => {
  try {
    const userList = await User.findAll();
    res.json(userList);
  } catch (e) {
    next(e);
  }
});

//GET usuario by id
router.get(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    const id = Number(req.params.id);
    try {
      const user = await User.findById(id);
      return res.json(user);
    } catch (e) {
      return next(e);
    }
  }
);

//Registrar usuario.
router.post(
  "/",
  (req, res, next) => {
    console.log(req.body);
    next();
  },
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    const userData = req.body;
    try {
      const newUser = await User.createUser(userData);
      return res.status(201).json(newUser);
    } catch (e) {
      return next(e);
    }
  }
);

module.exports = router;
