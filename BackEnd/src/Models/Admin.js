const { timeStamp } = require("console");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new mongoose.Schema({

    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true,
    },
    Password:{
        type:String,
        required:true,

    }
},{timeStamps:true})

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   Name: {
//     type: String,
//     required: true,
//   },
//   Email: {
//     type: String,
//     required: true
//   },
//   Age: {
//     type: Number,
//     required: true,
//   },
//   BornIn: {
//     type: String,
//     required: true
//   },
//   LivesIn: {
//     type: String,
//     required: true
//   },
//   MartialStatus: {
//     type: String,
//     required: true
//   },
//   PhoneNumber: {
//     type: String,
//     required: true
//   },
//   Job: {
//     type: String,
//     required: true
//   }
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);
// module.exports = User;