const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const adminSchema = new Schema({

Id:{
    type :Number,
    required:true,
},

Name:{
    type : String,
    required:true, 
},

Email:{
    type:String,
    required:true,
},
Password:{
    type:String,
    required:true,
}

});

const Admin = mongoose.model('Adminstrator', adminSchema);
module.exports = Admin;