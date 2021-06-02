const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName1: {
    type: String,
    required: true,
  },
  lastName2: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  dni: {
    type: String,
    unique: true,
  },
  telephone: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  specialty: {
    type: Array,
    required: true,
  },
});

const toJSONConfig = {
  transform: (doc, ret, opt) => {
    delete ret["password"];
    return ret;
  },
};

userSchema.set("toJSON", toJSONConfig);

const User = mongoose.model("User", userSchema);
module.exports = User;
