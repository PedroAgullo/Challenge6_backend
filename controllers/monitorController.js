const Monitor = require("../models/monitor");
const User = require("../models/user");
const bcrypt = require("bcrypt");

class Profesor {
  constructor() {}

  async findAllMonitor() {
    return Monitor.find();
  }

  async findAllMonitorName() {
     let data = await Monitor.find();
    let num = data.length;
    var monitor=[];
      for(let x = 0; x < num; x++){
    
          monitor[x] = {
            _id : data[x]._id,
            name : data[x].name
          }
      }
     return monitor;
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
    const userId = data.member; // id Usuario

    const usuarioName = await User.findById(userId);

    const tiempo = Date.now();
    let fecha = new Date(tiempo);
    fecha.toUTCString();
  
    let mensaje = {
      idUser: data.member,
      usuario: usuarioName.name,
      text: data.texto,
      fecha: fecha,
      rating: data.rating,
    };


    return Monitor.findByIdAndUpdate(
      { _id: id },
      { $push: { review: mensaje } }
    );
  }
}

let monitorController = new Profesor();
module.exports = monitorController;
