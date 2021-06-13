const userController = require("./userController.js");
const monitorController = require("./monitorController.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "Los mas jovenes del Bootcamp";

class LoginController {
  async validateUser(emailCheck, passwordCheck) {
    let user = await userController.findByEmail(emailCheck);
    
    if (user == null) {
      throw new Error("El password o el email son incorrectos.");
    }

    let password = user.password;

    let verificar = await bcrypt.compare(passwordCheck, password);
    if (!verificar) {
      throw new Error("El password o el email son incorrectos.");
    }

    if (!user.isActive) {
      throw new Error("La cuenta no está activa. Por favor, revisa tu correo electrónico y activa tu cuenta.");
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
      throw new Error("El password o el email son incorrectos.");
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
