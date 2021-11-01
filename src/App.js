
//External variables
const express = require("express");
const mongoose = require("mongoose");
const admin = require("./models/Admin");

var adminId = 0 ;

//the link of the mongo db
const MongoURI = 'mongodb+srv://dash_hamada:Adhom_Shosho_Dodo_Hamada@dashcluster.yrwpn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

//App variables
const app = express();
const port = process.env.PORT || "8000";


// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log("MongoDB is now connected"))
  .catch(err => console.log(err));








app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
  
