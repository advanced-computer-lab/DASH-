const express = require('express');
const FlightController = require('../controller/flightController');
const FlightRouter = express.Router();
FlightRouter.use(express.json());
FlightRouter.use(express.urlencoded({extended:false}));


FlightRouter.post('/add',FlightController.addFlight);

FlightRouter.get('/getAllFlights',FlightController.getAllFlights);


FlightRouter.post('/deleteFlight',FlightController.deleteFlight);


module.exports=FlightRouter;