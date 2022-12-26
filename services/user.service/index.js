const sequelize = require("../../lib/sequelize");
const boom = require("@hapi/boom");
const { models } = require("../../lib/sequelize");
const { not } = require("joi");

class UserService {
  constructor() {
    this.db = sequelize;
    //this.db.on("error", (err) => console.error(err));
  }
  async findAll() {
    //const query = "SELECT * FROM users";
    //const [users] = await this.db.query(query);
    const users = await models.User.findAll();
    console.table(users);
    return users;
  }

  async findById(id) {
    // const query = "SELECT * FROM users WHERE id = :id";
    // const [user] = await this.db.query(query, { replacements: { id: id } });
    const user = await models.User.findByPk(id);
    if (!user) throw boom.notFound("User not found by this id");
    return user;
  }

  async createUser(data) {
    const userFoundWithSameEmail = await models.User.findOne({
      where: {
        email: data.email,
      },
    });
    if (userFoundWithSameEmail)
      throw boom.conflict("There is a user already registered with this email");
    const newUser = await models.User.create(data);
    return newUser;
  }
}

module.exports = UserService;
