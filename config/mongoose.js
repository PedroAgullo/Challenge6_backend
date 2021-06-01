const mongoose = require('mongoose');
const QUERY_STRING = "mongodb+srv://admin:Admin1234@cluster0.oihlm.mongodb.net/dbReto6?retryWrites=true&w=majority";

// Connection to DB
const db = mongoose.connect(QUERY_STRING,
    {useNewUrlParser: true, useUnifiedTopology: true})
.then(console.log('Conectado a la base de datos'))
.catch((error) => console.log(error));


module.exports = db;