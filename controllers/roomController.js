const User = require('../models/user');
const Monitor = require('../models/monitor');
const Room = require('../models/room');
const prueba = require('../controllers/roomController.js');

class Sala {

    async findAllRooms(){
        return Room.find();
    }

    async findAllRoomsActive(){
        return Room.find(
            {isActive: "true"},
        );
    }

    async findAllRoomsNoActive(){
        return Room.find(
            {isActive: "false"},
        );
    }

    async findByDate(fecha){
        return Room.find(
            {date: fecha}
        )
    }

    async deleteRoom(id){
        return Room.findByIdAndRemove(id);
    }

    async createRoom(room){
        return Room.create(room);
    }

    async joinRoom(data){
        const id = data.id;
        const member = data.member;

        let arrayRoom = [];  //Declaramos el array vacio.

        //Encontramos la room mediante el id. Nos devuelve la coleccion completa.
        let room = await Room.findById(id);

        arrayRoom = room.members;  //Metemos en arrayRoom el array completo de usuarios de la actividad.
        let roomStatus = arrayRoom.length; //roomStatus coge el número de users que hay en el array.

        //Comprobamos si el usuario ya está apuntado en la clase.
        for (let i=0; i < roomStatus; i++){
            if (arrayRoom[i] == member){
                throw new Error ( "Ya estabas suscrito a esta clase.");  
            }
        }

        //Comparamos roomStatus, si es mayor que 10 nos dice que la sala está llena, sino pasa a añadir el user.
        if (roomStatus > 6){
            throw new Error ( "La clase está llena.");  
        }


        //Esta parte nos añade el usuario a la clase si hay sitio disponible.
        return Room.findByIdAndUpdate(
            {_id: id},
            {$push: {members: member}});        
    }

    async joinRoomCoach(data){
        const id = data.id;
        const coach = data.coach;  
        console.log(id,"ID que le pasasmos por Postman");
        let rooms = [];
        rooms = await Room.find(
            {_id: id},
            );
    
        let ocupado = [];
        let prueba = [];

        ocupado = await Room.find(
            {   coaches: coach,
                date: rooms[0].date}
        ) 
        
     console.log(ocupado, "Clases que tiene a la misma hora");
        if (ocupado != prueba){
            throw new Error ( "Ya tienes una clase a esa hora."); 
        }

        console.log(ocupado, "<<<<==== Rooms que tienen la misma fecha y el mismo profesor")






  
        
        let arrayRoom = [];  //Declaramos el array vacio.

        //Encontramos la room mediante el id. Nos devuelve la coleccion completa.
        let room = await Room.findById(id);

        arrayRoom = room.coaches;  //Metemos en arrayRoom el array completo de usuarios de la actividad.
        let roomStatus = arrayRoom.length; //roomStatus coge el número de users que hay en el array.

        //Comprobamos si el usuario ya está apuntado en la clase.
        for (let i=0; i < roomStatus; i++){
            if (arrayRoom[i] == coach){
                throw new Error ( "Ya tienes esta clase asignada.");  
            }
        }

        //Comparamos roomStatus, si es mayor que 10 nos dice que la sala está llena, sino pasa a añadir el user.
        if (roomStatus >= 1){
            throw new Error ( "Ya hay un monitor asignado a esta clase.");  
        }





        return Room.findByIdAndUpdate(
            {_id: id},
            {$push: {coaches: coach}});
    }

    async leaveRoom(data){
        const id = data.id;
        const member = data.member;
        console.log(id,member);
        return Room.findByIdAndUpdate(
            {_id: id},
            {$pull: {members: member}});
    }

    async leaveRoomCoach(data){
        const id = data.id;
        const coach = data.coach;
        console.log(id,coach);
        return Room.findByIdAndUpdate(
            {_id: id},
            {$pull: {coaches: coach}});
    }

    async deleteRoom(id){
        return Room.findByIdAndRemove(id);
    }

/*     async addMessage(data){

        const id = data.id;
        const userId = data.userId;

        const usuarioName = await User.findById(userId);

        let mensaje = {
            idUser: data.userId,
            usuario: usuarioName.name,
            text: data.texto,
            fecha: data.fecha,
            reportado: data.reportado,
            entregado: data.entregado,
            leido: data.leido
        };

        console.log(mensaje);

        return Room.findByIdAndUpdate(
            {_id: id},
            {$push: {mensajes: mensaje}});
        
    } */

}



let roomController = new Sala();
module.exports = roomController;