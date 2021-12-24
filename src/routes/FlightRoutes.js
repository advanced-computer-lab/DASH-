const express = require('express');
const Flight = require('../models/Flight'); 
const auth = require("../middleware/auth");

const FlightControl = require('../controller/FlightController');
const FlightRouter = express.Router();
FlightRouter.use(express.json());
FlightRouter.use(express.urlencoded({extended:false}));


FlightRouter.post('/add',auth,FlightControl.addFlight);
FlightRouter.post('/find',auth,FlightControl.findFlight);
FlightRouter.get('/getAllFlights',auth,FlightControl.getAllFlights);
FlightRouter.post('/deleteFlight',auth,FlightControl.deleteFlight);
FlightRouter.post('/FindFlight',auth,FlightControl.getFlightbyNumb);

FlightRouter.post('/editFlight', auth ,FlightControl.editFlight)



FlightRouter.post('/showFlight',auth,FlightControl.showFlight);

FlightRouter.post('/getAllTickets',auth,FlightControl.getAllTickets);

// FlightRouter.post('/availableEconomy',(req,res)=>{
//     Flight.findOne({FlightNumber:req.body.FlightNumbaer})
//     .then(result=>{
//        // res.header("Content-Type",'application/json');
//         //res.send(JSON.stringify(result, null, 4));
//         const availEconomySeats=result.noEconomySeats-req.body.noEconomySeats;
//         const availBusSeats=result.noBusinessSeats-req.body.noBusinessSeats;
//         const availFirstSeats=result.noFirstSeats-req.body.noFirstSeats;

//         const out={

//         }
//         result.noEconomySeats;

//     })
// })
FlightRouter.post('/av',auth,(req,res)=>{
    Flight.find({FlightNumber:req.body.FlightNumber})
    .then(result=>{
        
        console.log(req.body);
        console.log("abdoooo")
       console.log(result);
        // const x = JSON.stringify(result, null, 4)
        const response = {
            AE:result[0].AvailE,
            AB:result[0].AvailB,
            AF:result[0].AvailF,
            priceE:result[0].priceEconomy,
            priceB:result[0].pricebusiness,
            priceF:result[0].priceFirst,
            Departure:result[0].toAir,
            Arrival:result[0].fromAir,
            DepartureTime:result[0].depTime,
            ArrivalTime:result[0].arrTime,

            noEconomySeats:result[0].noEconomySeats,
            noBusinessSeats:result[0].noBusinessSeats,
            noFirstSeats:result[0].noFirstSeats,
        }
        console.log(response);
        //console.log(response);
        //console.log(JSON.stringify(response, null, 4))
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(response, null, 4));
    })
})
module.exports=FlightRouter;