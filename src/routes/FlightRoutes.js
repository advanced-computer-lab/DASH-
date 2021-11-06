const express = require('express');
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



module.exports=FlightRouter;