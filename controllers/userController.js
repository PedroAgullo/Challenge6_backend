const User = require("../models/user");
const bcrypt = require("bcrypt");

class Cliente {
  constructor() {}

  async findAllUsers() {
    return User.find();
  }

  async createUser(user) {
    user.password = await bcrypt.hash(user.password, 10);
    return User.create(user);
  }

  async findByEmail(email) {
    return User.findOne({ email: email });
  }

  async modifyUser(data) {
    return User.findByIdAndUpdate(
      { _id: data.id },
      //Datos que cambiamos
      {
        address: data.address,
        country: data.country,
        city: data.city,
        telephone: data.telephone,
        isActive: data.isActive,
      },
      { new: true, omitUndefined: true }
    );
  }

// para cambiar la suscripcion del usuario por anual, mensual o pendiente
  async updateStatusMember(data) {
    return User.findByIdAndUpdate(
      { _id: data.id },
      //Datos que cambiamos
      {
        subscription: data.subscription,
      },
      { new: true, omitUndefined: true }
    );
  }

}

let userController = new Cliente();
module.exports = userController;
