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

}



let userController = new Cliente();
module.exports = userController;