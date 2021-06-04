const userController = require("./userController.js");
const monitorController = require("./monitorController.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "Los mas jovenes del Bootcamp";

class LoginController {
  async validateUser(emailCheck, passwordCheck) {
    let user = await userController.findByEmail(emailCheck);

    let password = user.password;

    let verificar = await bcrypt.compare(passwordCheck, password);
    if (!verificar) {
      return new Error("El password o el email no coinciden");
    }
    let payload = {
      id: user._id,
      createdAt: new Date(),
      isAdmin: user.isAdmin,
    };
    return jwt.sign(payload, secret);
  }

  async validateMonitor(emailCheck, passwordCheck) {
    let monitor = await monitorController.findByEmailMonitor(emailCheck);

    let password = monitor.password;

    let verificar = await bcrypt.compare(passwordCheck, password);
    if (!verificar) {
      return new Error("El password o el email no coinciden");
    }
    let payload = {
      id: monitor._id,
      createdAt: new Date(),
      isAdmin: monitor.isAdmin,
    };
    return jwt.sign(payload, secret);
  }
}
let loginController = new LoginController();
module.exports = loginController;
