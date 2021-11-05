// External variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
const MongoURI = 'mongodb+srv://dash_hamada:Adhom_Shosho_Dodo_Hamada@dashcluster.yrwpn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' ;


//App variables
const app = express();
const port = process.env.PORT || "8000";

app.use(cors());
const Flight = require('./models/Flight');
const FlightRouter = require('./routes/FlightRoutes') ;
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));
// #Importing the userController
/*var all = "" ;

Flight.find({},function(err,docs){
    if(err){}
    else {
       console.log(docs);
       all = docs ;
    }
})*/
app.get("/",(req,res)=> {
   // Flight.findOneAndDelete({"id":112});
    res.status(200).send("all good");
})



/*Flight.findOneAndUpdate({id: 112}, {$set:{id:444}}, {new: true}, (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }

    console.log(doc);
});*/

const adminRouter = require("./routes/adminRouter");

app.use('/admins',adminRouter);
app.use('/Flight' , FlightRouter);

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });