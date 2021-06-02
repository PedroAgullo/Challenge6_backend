const Monitor = require("../models/monitor");
const bcrypt = require("bcrypt");

class Profesor {
  constructor() {}

  async findAllMonitor() {
    return Monitor.find();
  }

  async createMonitor(monitor) {
    monitor.password = await bcrypt.hash(monitor.password, 10);
    return Monitor.create(monitor);
  }

  async findByEmailMonitor(email) {
    return Monitor.findOne({ email: email });
  }

  async modifyMonitor(data) {
    return User.findByIdAndUpdate(
      { _id: data.id },
      //Datos que cambiamos
      { address: data.address,
      country: data.country,
      city: data.city,
      telephone: data.telephone,
      isActive: data.isActive },{new:true,omitUndefined:true},
    );
    
  }
}

let monitorController = new Profesor();
module.exports = monitorController;
