const User = require('../models/user');
const bcrypt = require('bcrypt');

class Cliente {

    constructor(){
    }

    async findAllUsers(){
        return User.find();
    }

    async createUser(user){
        user.password = await bcrypt.hash(user.password, 10);
        return User.create(user);
    }


    async findByEmail(email) {
        return User.findOne({ email: email });
    }


    async modifyUser(data){
        return User.update(
            //Datos que cambiamos
            {email: data.email, password: data.password, birthday: data.birthday, address: data.address, country: data.country, city: data.city, telephone: data.telephone, isActive: data.isActive},
            //Donde..
            {where: {id: data.id}}
        )
    }   
}



let userController = new Cliente();
module.exports = userController;