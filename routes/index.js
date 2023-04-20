const app = require("../app");
const usersRouter = require("./users.router");
const indexRouter = require("./index.router");
const coursesRouter = require("./courses.router");
const authRouter = require("./auth.router");
const studySessionRouter = require("./studysession.router");

function routesApi(app) {
  app.use("/", indexRouter);
  app.use("/users", usersRouter);
  app.use("/courses", coursesRouter);
  app.use("/auth", authRouter);
  app.use("/study-session", studySessionRouter);
}

module.exports = routesApi;
