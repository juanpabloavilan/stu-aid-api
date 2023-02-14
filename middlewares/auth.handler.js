const boom = require("@hapi/boom");

function checkOwnerPermission(EntityService, property, attributeName) {
  return async (req, res, next) => {
    const userLoggedId = Number(req.user.sub);
    const entityId = req[property][attributeName];
    console.log(entityId);
    try {
      const isOwner = await EntityService.isOwner(userLoggedId, entityId);
      console.log(isOwner, "isOwnerMiddleware");
      if (!isOwner)
        throw boom.unauthorized("You are not the owner of this resource");
    } catch (error) {
      next(error);
    }
    next();
  };
}

module.exports = checkOwnerPermission;
