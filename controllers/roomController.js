const User = require("../models/user");
const Monitor = require("../models/monitor");
const Room = require("../models/room");

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
        if (rooms[x].members[y] == user.id){
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
    return Room.find({ date: fecha });
  }

  async deleteRoom(id) {
    return Room.findByIdAndRemove(id);
  }

  async updateStatusRoom(data) {
    let clase = await Room.findById(data.id);
    let userArray = clase.members;
    var listaArray = [];

    // Buscar los usuarios dentro de la clase para enviar email para review
    for (var x = 0; x < userArray.length; x++) {
      var usuario = await User.findById(userArray[x]);

      let lista = {
        usuario: usuario.name,
        email: usuario.email,
      };

      listaArray[x] = lista;
    }

    listaArray[x] =
      "Clase terminada. Enviar correos para review a los usuarios de la clase";

    // Update Active status
    Room.findByIdAndUpdate({ _id: data.id }, { isActive: data.isActive });
    return listaArray;
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

    //Esta parte nos añade el usuario a la clase si hay sitio disponible.
    return Room.findByIdAndUpdate({ _id: id }, { $push: { members: member } });
  }

  async joinRoomCoach(data) {
    const id = data.id;
    const coach = data.coach;
    const nameCoach = data.nameCoach;
    let rooms = [];
    let monitor;

    //Nos busca la room donde quiere entrar el coach
    rooms = await Room.find({ _id: id });

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

    //Busca las rooms donde tiene ya clase en esa hora y día.
    let ocupado = [];
    ocupado = await Room.find({ coaches: coach, date: rooms[0].date });

    if (ocupado[0] != null) {
      throw new Error("Ya tienes una clase a esa hora.");
    }

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
    return Room.findByIdAndUpdate({ _id: id }, { $pull: { coaches: coach } });
  }

  async deleteRoom(id) {
    return Room.findByIdAndRemove(id);
  }
}

let roomController = new Sala();
module.exports = roomController;
