const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: {
    type: String,
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
  dateStart: {
    type: Date,
    required: true,
  },
  dateEnd: {
    type: Date,
    required: true,
  },
  coaches: {
    type: Array,    
  },
  nameCoach: {
    type: Array
  },
  members: {
    type: Array,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  maxMember: {
    type: Number,
    default: 5,
  },
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
