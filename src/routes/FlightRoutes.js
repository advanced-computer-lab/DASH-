const express = require('express');
const FlightControl = require('../controller/FlightController');
const FlightRouter = express.Router();
FlightRouter.use(express.json());
FlightRouter.use(express.urlencoded({extended:false}));


FlightRouter.post('/add',FlightControl.addFlight);
FlightRouter.get('/get',FlightControl.getallFlights);




module.exports=FlightRouter;