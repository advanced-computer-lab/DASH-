const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const userSchema = new Schema({
    id: {
        type: Number,
       // unique:true,
      },
    toAir: {
        type: String,
        required: true,
      },
      fromAir: {
        type: String,
        //required: true,
      },
      noEconomySeats: {
        type: Number,
       // required: true,
      },
      noBusinessSeats: {
        type: Number,
        //required: true,
      },
      noFirstSeats: {
        type: Number,
        //required: true,
      },
      depTime: {
        type: String,
        //required: true,
      },
      arrTime: {
        type: String,
        //required: true,
      },
      dateFlight: {
        type: Date,
        //required: true,
      },


});


const Flight = mongoose.model('Flight', userSchema);
module.exports = Flight;