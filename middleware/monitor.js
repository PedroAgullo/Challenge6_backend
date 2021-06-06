const jwt = require("jsonwebtoken");
const secret = "Los mas jovenes del Bootcamp";
const coach = require("../controllers/monitorController.js");

const monitor = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Tienes que hacer login para realizar esta acción.");
    }
    let token = req.headers.authorization.split(" ")[1];
    let auth = jwt.verify(token, secret);

    let isMonitor = await coach.findMonitorById(auth.id);
    if (isMonitor === null && auth.isAdmin === false) {
      throw new Error("Solo los monitores o los Admin están autorizados.");
    }
    return next();
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
module.exports = monitor;
