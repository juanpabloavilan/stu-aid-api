const boom = require("@hapi/boom");

function logHttpError(err, req, res, next) {
  console.group("Loggin error");
  console.error(err);
  console.groupEnd();
  next(err);
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    return res.status(output.statusCode).json({
      ...output.payload,
    });
  }
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    status: 500,
    message: "Internal Server Error " + err.message,
    stack: err.stack,
  });
}

module.exports = { logHttpError, errorHandler, boomErrorHandler };
