const Locker = require("../models/locker");

const userController = require("../controllers/userController.js");

class LockerController {
  async findAllLocker() {
    return Locker.find();
  }

  async findLockerNoRent() {
    return Locker.find({ isActive: "true" });
  }

  async findLockersRent() {
    return Locker.find({ isActive: "false" });
  }

  async createLocker(data) {
    let locker = {
      name: data.name,
      userId: "",
      size: data.size,
      date: Date.now(),
    };

    return Locker.create(locker);
  }

  async rentLocker(data) {
    let lockers = [];
    lockers = await Locker.find();

    for (let x = 0; x <= lockers.lenght; x++) {
      if (data.userId == lockers[0].userId) {
        throw new Error("No puedes alquilar más de una taquilla.");
      }
    }

    const tiempo = Date.now();
    let fecha = new Date(tiempo);
    fecha.toLocaleDateString();

    return Locker.findByIdAndUpdate(
      { _id: data.id },
      { userId: data.userId, date: fecha }
    );
  }

  async updateStatusLocker(data) {
    return Locker.findByIdAndUpdate(
      { _id: data.id },
      { isActive: data.isActive },
      { new: true, omitUndefined: true }
    );
  }
}
let lockerController = new LockerController();
module.exports = lockerController;
