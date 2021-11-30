const express = require('express');
const Flight = require('../models/Flight'); 

const FlightControl = require('../controller/FlightController');
const FlightRouter = express.Router();
FlightRouter.use(express.json());
FlightRouter.use(express.urlencoded({extended:false}));


FlightRouter.post('/add',FlightControl.addFlight);
FlightRouter.post('/find',FlightControl.findFlight);
FlightRouter.get('/getAllFlights',FlightControl.getAllFlights);
FlightRouter.post('/deleteFlight',FlightControl.deleteFlight);
FlightRouter.post('/FindFlight',FlightControl.getFlightbyNumb);

FlightRouter.post('/editFlight',FlightControl.editFlight)

FlightRouter.post('/showFlight',FlightControl.showFlight);

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
FlightRouter.post('/av',(req,res)=>{
    Flight.find({FlightNumber:req.body.FlightNumber})
    .then(result=>{
        
        //console.log(req.body);
       //console.log(result);
        // const x = JSON.stringify(result, null, 4)
        const response = {
            AE:result[0].AvailE,
            AB:result[0].AvailB,
            AF:result[0].AvailF
        }
        //console.log(response);
        //console.log(JSON.stringify(response, null, 4))
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(response, null, 4));
    })
})
module.exports=FlightRouter;