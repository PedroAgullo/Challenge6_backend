const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: { 
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    coaches: {
        type: Array,
        required: true
    },
    members: {
        type: Array,
    },
    // mensajes: {
    //     type: Array
    // },
    isActive: {
        type: Boolean,
        default: true
    }
});


const Room = mongoose.model('Room', roomSchema);
module.exports = Room;