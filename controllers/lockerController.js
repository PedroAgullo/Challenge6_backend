const Locker = require("../models/locker");

const userController = require("../controllers/userController.js");

class LockerController {
    
    async findAllLocker() {
        return Locker.find();
    }

    async createLocker(data) {


      let locker = {
        "name" : data.name,
        "userId" : "",
        "size" : data.size,
        "date" : "" 
      };

        return Locker.create(locker);        
    }  

    async rentLocker(data) {

      let lockers = [];
      lockers = await Locker.find();

      for (let x = 0; x <= lockers.lenght; x++){
        if (data.userId == lockers[0].userId){
          throw new Error("No puedes alquilar más de una taquilla.");
        }
      }

      const tiempo = Date.now();
      let fecha = new Date(tiempo);
      fecha.toLocaleDateString();

      return Locker.findByIdAndUpdate({ _id: data.id }, { userId: data.userId, date: fecha});

   
    }

}
let lockerController = new LockerController();
module.exports = lockerController;
