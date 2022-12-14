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
    const usuariosLista = await User.findAll();
    res.json(usuariosLista);
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
      const usuario = await User.findById(id);
      console.log(usuario);
      if (!usuario) return next(boom.notFound("Not user found by this id"));
      return res.json(usuario);
    } catch {
      return next(e);
    }
  }
);

module.exports = router;
