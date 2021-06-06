const mongoose = require("mongoose");
const QUERY_STRING =
  "mongodb+srv://admin:Admin1234@cluster0.oayl4.mongodb.net/dbGym?retryWrites=true&w=majority";

// Connection to DB
const db = mongoose
  .connect(QUERY_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Conectado a la base de datos"))
  .catch((error) => console.log(error));

module.exports = db;
