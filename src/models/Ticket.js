const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    Email:{
    type:String,
    required:true,
    },
    TicketNumber:{
        type:Number,
        required : true
    },
    FlightNumber:{
        type:Number,
        required:true,
    },
    BusinessSeatAdult:{
        type:Number,
        required:true,
    },
    FirstSeatAdult:{
        type:Number,
        required:true,
    },
    EconomySeatsAdult:{
        type:Number,
        required:true,
    },
    BusinessSeatChild:{
        type:Number,
        required:true,
    },
    FirstSeatChild:{
        type:Number,
        required:true,
    },
    EconomySeatsChild:{
        type:Number,
        required:true,
    },
    Price:{
        type:Number,
        required:true,  
    },
    Departure:{
        type:String,
        required:true,
    },
    Arrival:{
        type:String,
        required:true
    },
    DepartureTime:{
        type:String,
        required:true,
    },
    ArrivalTime:{
        type:String,
        required:true,
    },
    ReservedSeatsE:{
        type:String,
    },
    ReservedSeatsB:{
        type:String,
    },
    ReservedSeatsF:{
        type:String,
    }

});
const Ticket = mongoose.model('Ticket', userSchema);
module.exports = Ticket;