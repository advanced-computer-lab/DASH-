// External variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userController = require('./controller/userController');
const flightController = require("./controller/FlightController");
const config = require("config");
//const bodyParser = require("body-parser");
//const session = require("express-session");
//const MongoDBSession = require('connect-mongodb-session')(session);
//const MongoDBStore = require('connect-mongodb-session')(session);

// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
dotenv.config();


const MongoURI = config.get("MongoURI");


//App variables
const app = express();
app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());
const port = process.env.PORT || "8000";

app.use(cors());


app.delete('/delete/:flightNumber', async(req,res) =>{
    const flightNum = req.params.flightNumber;
    
    deletedId=req.body.data;
    
    const userEmail = localStorage.getItem("Email");
    console.log(userEmail);
    Ticket.findOneAndDelete({FlightNumber:flightNum, Email: userEmail }, function (err, docs) {
    if (err){
         console.log(err);
         console.log("Didn't Find this Flight in Database");
    }

})});

const Flight = require('./models/Flight');
const FlightRouter = require('./routes/FlightRoutes') ;

// const store=new MongoDBSession({
//     uri:MongoURI,
//     collection:'mySessions',
// });

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB connected") )
.catch(err => console.log(err));




// app.use(
//     session({
//         secret:"Key for the cookie",
//         resave:false,
//         saveUninitialized:false,
//         store:store,
//     })
// )

// const verify =(req,res,next)=>{
        
//     const token = req.headers["x-access-token"]?.split('')[1];

//     if(token){
//         jwt.verify(token,process.env.PASSPORTSECRET,(err,decoded)=>{
//             if(err) return res.json({
//                 isLoggedIn:false,
//                 message:"Failed To Authenticate"
//             })
//             req.user = {};
//             req.user.id = decoded.id;
//             req.user.Email = decoded.Email;
//             next();
            
//         })
//     }else{
//         res.json({message:"Incorrect Token Given",isLoggedIn:false});
//     }
// }

// #Importing the userController
/*var all = "" ;
*/
/*Flight.find({FlightNumer :'', toAir : 'MJA', fromAir : 'DXB'},function(err,docs){
    if(err){}
    else {
       console.log(docs);
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
const userRouter=require("./routes/userRouter");

//app.use('/user',verify,userRouter);
app.use('/admins',adminRouter);
app.use('/Flight' , FlightRouter);

app.use('/user',userRouter);

// app.post('/logIn',userController.logIn);
// app.post('/signUp',userController.signUp);
// app.post('user/find',verify,userController.findUser);
// app.get('user/getFlights' ,verify,  flightController.getAllFlights);




// app.get("/auth",(req, res, next) => {
//         if (req.session.isAuth) {
//             next();
//         } else {
//             req.session.error = "You have to Login first";
//             res.send(false);
//         }
//     }); 



app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });