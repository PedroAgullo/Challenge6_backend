const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monitorSchema = new Schema({
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
  speciality: {
    type: [String],
    enum: [
      "Zumba",
      "Crossfit",
      "Boxeo",
      "Pilates",
      "Yoga",
      "Gap",
      "Cardio",
      "Fuerza",
      "Salsa",
      "Spinning",
    ],
    required: true,
  },
  review: {
    type: Array,
  },
  photo: {
    type: String,
    default : ""
  },
});

const toJSONConfig = {
  transform: (doc, ret, opt) => {
    delete ret["password"];
    return ret;
  },
};

monitorSchema.set("toJSON", toJSONConfig);

const Monitor = mongoose.model("Monitor", monitorSchema);
module.exports = Monitor;
