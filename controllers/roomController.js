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
        return Room.findByIdAndUpdate(
            {_id: id},
            {$push: {members: member}});
    }

    async leaveRoom(data){
        const id = data.id;
        const member = data.member;
        console.log(id,member);
        return Room.findByIdAndUpdate(
            {_id: id},
            {$pull: {members: member}});
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