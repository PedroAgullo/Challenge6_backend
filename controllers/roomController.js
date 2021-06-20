const User = require("../models/user");
const Monitor = require("../models/monitor");
const Room = require("../models/room");
const nodemailer = require('../config/nodemailerConfig.js');
const userController = require ('../controllers/userController.js');


class Sala {
  async findAllRooms() {
    return Room.find();
  }

  async findAllRoomsActive() {
    return Room.find({ isActive: "true" });
  }


  //Encuentra las clases que tiene un usuario
  async findMyRooms(user) {
    let rooms = [];
    var myRooms = [];

    rooms = await this.findAllRoomsActive();
    


    for(let x = 0; x < rooms.length; x++){
      var membersArray = rooms[x].members;
      for (let y = 0; y < membersArray.length; y++){
        if (rooms[x].members[y] == user.member){
          myRooms.push(rooms[x])
        }
    }

    }
    
    return myRooms; 
  
  }

  async findMyMonitorRooms(user) {
    let rooms = [];
    var myRooms = [];

    rooms = await this.findAllRoomsActive();

    for(let x = 0; x < rooms.length; x++){
      var coachesArray = rooms[x].coaches;
      for (let y = 0; y < coachesArray.length; y++){
        if (rooms[x].coaches[y] == user.id){
          myRooms.push(rooms[x])
        }
    }

    }    
    return myRooms;   
  }


  async findAllRoomsNoActive() {
    return Room.find({ isActive: "false" });
  }

  async findAllRoomsActivity(body) {
    return Room.find({ name: body.name, isActive: "true" });
  }

  async findByDate(fecha) {
    return Room.find({ dateStart: fecha });
  }


  //Busca clases por filtro de fecha y nombre.
  async findByDateName(filtro) {


    let roomFecha = await this.findByDate(filtro.date);
    let room = await this.findAllRoomsActivity(filtro.name);
    
    return room;
  }



  async deleteRoom(id) {
    return Room.findByIdAndRemove(id);
  }



  async updateStatusRoom(data) {
    let clase = await Room.findById(data.id);
    let allUsers = await userController.findAllUsers();
    
    console.log(clase, "Datos de la clase : ");


    console.log(clase.members.length, "Tamaño del array de la clase");
    console.log(allUsers.length, "Tamaño de los usuarios");
    console.log(clase.members[0], "Id del member de la clase");
    console.log(allUsers[0]._id, "Id del member de la clase");


    //Busca los usuarios de la clase, dentro del array de todos los usuarios para encontrar su email y mandarle el correo.
    for(let x=0; x < clase.members.length; x++){
      console.log("Estamos en el for de members en la vuelta : ", x);
      for(let y=0; y < allUsers.length; y++){
        console.log("Estamos en el for de users en la vuelta : ", y);
        if (clase.members[x] == allUsers[y]._id){
          nodemailer.sendReviewClass(allUsers[y].name, allUsers[y].email);
          console.log(allUsers[y].email)
        }
      }
    }

    // Update Active status
    return Room.findByIdAndUpdate({ _id: data.id }, { isActive: data.isActive });    
  }



  async createRoom(room) {
    return Room.create(room);
  }



  async joinRoom(data) {
    const id = data.id;
    const member = data.member;

    let user = await User.findById(data.member);

    //Comprueba si está suscrito.
    if (user.subscription == "Pendiente") {
      throw new Error("Pasa por administración para regular tu subscripción.");
    }

    let arrayRoom = []; //Declaramos el array vacio.

    //Encontramos la room mediante el id. Nos devuelve la coleccion completa.
    let room = await Room.findById(id);

    arrayRoom = room.members; //Metemos en arrayRoom el array completo de usuarios de la actividad.
    let roomStatus = arrayRoom.length; //roomStatus coge el número de users que hay en el array.

    //Comprobamos si el usuario ya está apuntado en la clase.
    for (let i = 0; i < roomStatus; i++) {
      if (arrayRoom[i] == member) {
        throw new Error("Ya estabas suscrito a esta clase.");
      }
    }

    //Comparamos roomStatus, si es mayor que 5 nos dice que la sala está llena, sino pasa a añadir el user.
    if (roomStatus > 4) {
      throw new Error("La clase está llena.");
    }


    nodemailer.sendConfirmationEmailNewClass(user.name, user.email, room.name, room.dateStart);


    //Esta parte nos añade el usuario a la clase si hay sitio disponible.
    return Room.findByIdAndUpdate({ _id: id }, { $push: { members: member } });

        
  }




  async joinRoomCoach(data) {
    const id = data.id;
    const coach = data.coach;
    const nameCoach = data.nameCoach;
    let rooms;
    let monitor;

    //Nos busca la room donde quiere entrar el coach
    rooms = await Room.find({ _id: id });
    console.log(rooms);
    monitor = await Monitor.findById(coach);

    //Compara especialidad de la room y el coach.
    let nombre = [];
    nombre = rooms[0].name;
    let num = monitor.speciality.length;
    let y = false;

    for (let x = 0; x < num; x++) {
      if (nombre == monitor.speciality[x]) {
        y = true;
      }
    }

    if (y == false) {
      throw new Error("No tienes esa especialidad. No puedes dar la clase");
    }

    // Busca las rooms donde tiene ya clase en esa hora y día.
    let ocupado;
    ocupado = await Room.find({ coaches: coach, isActive: true, dateStart : rooms[0].dateStart }); 
    console.log(rooms[0].dateStart);
    console.log("guarda la clase que coincida : ", ocupado);
        if (ocupado[0] != undefined){
          throw new Error("Ya tienes una clase a esa hora.");
          console.log("Ya tienes una clase a esa hora");
      }


    // if (muyOcupado[0] != undefined) {
    //   throw new Error("Ya tienes una clase a esa hora.");
    // }


    let arrayRoom = []; //Declaramos el array vacio.

    //Encontramos la room mediante el id. Nos devuelve la coleccion completa.
    let room = await Room.findById(id);

    arrayRoom = room.coaches; //Metemos en arrayRoom el array completo de usuarios de la actividad.
    let roomStatus = arrayRoom.length; //roomStatus coge el número de users que hay en el array.

    //Comprobamos si el entrenador ya está apuntado en la clase.
    for (let i = 0; i < roomStatus; i++) {
      if (arrayRoom[i] == coach) {
        throw new Error("Ya tienes esta clase asignada.");
      }
    }

    //Comparamos roomStatus, si es mayor que 1 nos dice que la sala está llena, sino pasa a añadir el user.
    if (roomStatus >= 1) {
      throw new Error("Ya hay un monitor asignado a esta clase.");
    }

    return Room.findByIdAndUpdate({ _id: id }, { $push: { coaches: coach, nameCoach: nameCoach } });
  }


  async leaveRoom(data) {
    const id = data.id;
    const member = data.member;
    return Room.findByIdAndUpdate({ _id: id }, { $pull: { members: member } });
  }


  async leaveRoomCoach(data) {
    const id = data.id;
    const coach = data.coach;
    return Room.findByIdAndUpdate({ _id: id }, { $pull: { coaches: coach}, nameCoach: ""});
  }


  async deleteRoom(id) {
    console.log ("id que lleag al controller: ", id);
    return Room.findByIdAndRemove(id);
  }
}

let roomController = new Sala();
module.exports = roomController;
