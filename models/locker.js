const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lockerSchema = new Schema({
  name: {
    type: Number,
    unique: true,
  },
  userId: {
    type: String,
  },
  size: {
    type: String,
    enum: [
      "Small",
      "Medium",
      "Big",
    ],
  },
  date: {
    type:Date,
  }
});

const toJSONConfig = {
  transform: (doc, ret, opt) => {
    delete ret["password"];
    return ret;
  },
};

lockerSchema.set("toJSON", toJSONConfig);

const Locker = mongoose.model("Locker", lockerSchema);
module.exports = Locker;
