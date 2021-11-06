// External variables
const express = require('express');
const mongoose = require('mongoose');
<<<<<<< Updated upstream
=======
const cors = require('cors')

>>>>>>> Stashed changes
// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
const MongoURI = 'mongodb+srv://dash_hamada:Adhom_Shosho_Dodo_Hamada@dashcluster.yrwpn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' ;


//App variables
const app = express();
const port = process.env.PORT || "8000";
<<<<<<< Updated upstream

=======
app.use(cors());
>>>>>>> Stashed changes
const Flight = require('./models/Flight');
const FlightRouter = require('./routes/FlightRoutes') ;
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));


app.get("/",(req,res)=> {
    res.status(200).send(all)
})

app.use('/Flight' , FlightRouter);
<<<<<<< Updated upstream

console.log("ASDFASDF")

app.post('/Search', function (req, res) {
    res.send('POST request to the homepage')
    console.log("Hamamamma");
})
  

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });

  app.listen(port+"/Search", () => {
    console.log(`Listening to requests on http://localhost:${port}/Search`);
  });
=======

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
>>>>>>> Stashed changes
