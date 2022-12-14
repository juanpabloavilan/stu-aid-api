const boom = require("@hapi/boom");

/**
 * Creador de middleware que valida la la estructura de la reques dependiendo del esquema.
 */
function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property]; // Property indica en que parte del req esta la info si esta en params, body o query
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      next(boom.badRequest(error));
    }
    //Sigue al siguiente middleware 😎
    next();
  };
}

module.exports = validatorHandler;
