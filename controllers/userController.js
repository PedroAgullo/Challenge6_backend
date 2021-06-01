const User = require('../models/user');
const bcrypt = require('bcrypt');

class Cliente {

    constructor(){
    }

    async findAllUsers(){
        return User.find();
    }

    // async createUser(user){
    //     user.password = await bcrypt.hash(user.password, 10);
    //     return User.create(user);
    // }

    async newUser(body) {
        let password = body.password;
        let passwordHashed = bcrypt.hashSync(password, 10);
        body.password = passwordHashed;
        return User.create(body);
      }



    async findByEmail(email) {
        return User.findOne({ email: email });
    }
    

}



let userController = new Cliente();
module.exports = userController;