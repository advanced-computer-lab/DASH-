const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    FirstName:{
        type:String,
        required:true,
    },
    LastName:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true,

    },
    Email:{
        type:String,
        required:true,
        unique:true,
    },
    Passportnumber:{
        type:String,
        required:true,
    },
    Type:{
        type:Boolean,
        required:true,
    },
    DateOB:{
        type:Date,
        required:true,
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
