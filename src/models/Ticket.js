const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    Email:{
    type:String,
    required:true,
    },
    Flightnumber:{
        type:Number,
        required:true,
    },
    BusinessSeatsnumber:{
        type:Number,
        required:true,
    },
    FirstSeatsnumber:{
        type:Number,
        required:true,
    },
    EconomySeatsnumber:{
        type:Number,
        required:true,
    }


});
const Ticket = mongoose.model('Ticket', userSchema);
module.exports = Ticket;