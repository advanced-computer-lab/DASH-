const express = require('express');
var cors = require("cors");
const mongoose = require("mongoose");

const adminRouter = require("./Routes/adminRouter");
const Admin = require("./Models/Admin");
const Flight = require("./Models/Flight");

const app = express();


const MongoURI = 'mongodb+srv://dash_hamada:Adhom_Shosho_Dodo_Hamada@dashcluster.yrwpn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' ;
mongoose.connect(MongoURI).then((result)=>console.log('connected to DB'))
.catch((err)=>console.log(err));

// const myObj =new Admin(
//     {
//         Name:"ahmed",
//         Email:"hamadaaskdskdsk@gmail.com",
//         Password:"12345",
//     }

// ); 

// myObj.save();
app.use(cors());


app.use('/admins',adminRouter);


app.listen(8000);
console.log("Back-end Listening on port 8000");




