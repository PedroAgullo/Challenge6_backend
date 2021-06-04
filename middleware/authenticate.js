const jwt = require("jsonwebtoken");
const secret = "Los mas jovenes del Bootcamp";

const authenticate = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Tienes que hacer login para realizar esta acción.");
    }
    let token = req.headers.authorization.split(" ")[1];
    let auth = jwt.verify(token, secret);
    if (auth.id != req.body.member) {
      throw new Error("No tienes permiso para realizar esta accion");
    }
    return next();
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
module.exports = authenticate;
