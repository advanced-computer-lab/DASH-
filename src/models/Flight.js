const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const userSchema = new Schema({
    FlightNumber: {
        type: Number,
        unique:false,
      },
    toAir: {
        type: String,
        required: true,
      },
      fromAir: {
        type: String,
        required: true,
      },
      noEconomySeats: {
        type: Number,
        required: true,
      },
      noBusinessSeats: {
        type: Number,
        required: true,
      },
      noFirstSeats: {
        type: Number,
        required: true,
      },
      depTime: {
        type: String,
        required: true,
      },
      arrTime: {
        type: String,
        required: true,
      },
      baggageallowance:{
        type:Number,
        required:true,
      },
      pricebusiness:{
        type:Number,
        required:true,
      },
      priceEconomy:{
        type:Number,
        required:true,
      },
      priceFirst:{
        type:Number,
        required:true,
      },
      Type:{
        type: String,
        required:true,
      },


      


    });


const Flight = mongoose.model('Flight', userSchema);
module.exports = Flight;