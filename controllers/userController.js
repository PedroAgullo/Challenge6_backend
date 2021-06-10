const User = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require('../config/nodemailerConfig.js');
const userControl = require ('./userController.js');

class Cliente {
  constructor() {}

  async findAllUsers() {
    return User.find();
  }

  async createUser(user) {
    user.password = await bcrypt.hash(user.password, 10);

    //Creamos una token que enviamos por mail para activar
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length )];
    }
    user = {
      name : user.name,
      lastName1: user.lastName1,
      lastName2: user.lastName2,
      email: user.email,
      password: user.password,
      birthday: user.birthday,
      address: user.address,
      country: user.country,
      city: user.city,
      dni: user.dni,
      telephone: user.telephone,
      subscription: user.subscription,
      token: token
    }

    console.log(user, "<<<==== Creado datos para pasarle a la funcion create");
    let usuario = await User.create(user);

    console.log(usuario, "<<<<==== Datos del usuario que hemos creado");






    await nodemailer.sendConfirmationEmail(user.name, user.email, token);

    return usuario;

  }

  async findByEmail(email) {
    return User.findOne({ email: email });
  }


  async findByToken(token) {
    return User.findOne({ token: token });
  }

  async modifyUser(data) {
    return User.findByIdAndUpdate(
      { _id: data.member },
      //Datos que cambiamos
      {
        address: data.address,
        country: data.country,
        city: data.city,
        telephone: data.telephone,
        isActive: data.isActive,
        photo: data.photo
      },
      { new: true, omitUndefined: true }
    );
  }

// para cambiar la suscripcion del usuario por anual, mensual o pendiente
  async updateSuscription(data) {

    let prueba = User.findByToken(data);
    console.log (prueba);


    return User.findByIdAndUpdate(
      { _id: data.id },
      //Datos que cambiamos
      {
        subscription: data.subscription,
      },
      { new: true, omitUndefined: true }
    );
  }


  //Función que recibe token de email y activa la cuenta del usuario.
  async updateActive(token) {

    let user = await userController.findByToken(token);
    console.log (user);


    return User.findByIdAndUpdate(
      { _id: user._id },
      //Datos que cambiamos
      {
        isActive: true,
      },
      { new: true, omitUndefined: true }
    );
  }


}




let userController = new Cliente();
module.exports = userController;
