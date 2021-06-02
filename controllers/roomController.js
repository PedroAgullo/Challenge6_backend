const User = require('../models/user');
const Monitor = require('../models/monitor');
const Room = require('../models/room');

class Sala {

    async findAllRooms(){
        return Room.find();
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

        //Aqui empieza la fiesta...
        let arrayRoom = [];  //Declaramos el array vacio.

        //Encontramos la room mediante el id. Nos devuelve la coleccion completa.
        let room = await Room.findOne(
            {_id: id}
        )


        arrayRoom = room.members;  //Metemos en arrayRoom el array completo de usuarios de la actividad.
        let roomStatus = arrayRoom.length; //roomStatus coge el número de users que hay en el array.

        //Comparamos roomStatus, si es mayor que 5 nos dice que la sala está llena, sino pasa a añadir el user.
        if (roomStatus > 5){
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