const sequelize = require("../../lib/sequelize");
const boom = require("@hapi/boom");
const { models } = require("../../lib/sequelize");

class UserService {
  constructor() {
    this.db = sequelize;
  }
  async findAll() {
    const users = await models.User.findAll();
    console.log(users);
    return users;
  }

  async findById(id) {
    const user = await models.User.findByPk(id, {
      include: ["courses"],
    });
    if (!user) throw boom.notFound("User not found by this id");
    return user;
  }

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async createUser(data) {
    const userFoundWithSameEmail = await this.findByEmail(data.email);
    if (userFoundWithSameEmail)
      throw boom.conflict("There is a user already registered with this email");
    const newUser = await models.User.create(data);
    return newUser;
  }
}

module.exports = UserService;
