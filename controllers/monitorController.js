const Monitor = require("../models/monitor");
const User = require("../models/user");
const bcrypt = require("bcrypt");

class Profesor {
  constructor() {}

  async findAllMonitor() {
    return Monitor.find();
  }

  async findMonitorById(id) {
    return Monitor.findById(id);
  }

  async createMonitor(monitor) {
    monitor.password = await bcrypt.hash(monitor.password, 10);
    return Monitor.create(monitor);
  }

  async findByEmailMonitor(email) {
    return Monitor.findOne({ email: email });
  }

  async modifyMonitor(data) {
    return Monitor.findByIdAndUpdate(
      { _id: data.id },
      //Datos que cambiamos
      {
        address: data.address,
        country: data.country,
        city: data.city,
        telephone: data.telephone,
        speciality: data.speciality,
        isActive: data.isActive,
      },
      { new: true, omitUndefined: true }
    );
  }

  async addMessage(data) {
    const id = data.id; // id Monitor
    const userId = data.userId; // id Usuario

    const usuarioName = await User.findById(userId);

    let mensaje = {
      idUser: data.userId,
      usuario: usuarioName.name,
      text: data.texto,
      fecha: Date.now(),
      rating: data.rating,
    };

    console.log(mensaje);

    return Monitor.findByIdAndUpdate(
      { _id: id },
      { $push: { review: mensaje } }
    );
  }
}

let monitorController = new Profesor();
module.exports = monitorController;
