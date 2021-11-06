const express = require('express');
const FlightControl = require('../controller/FlightController');
const FlightRouter = express.Router();
FlightRouter.use(express.json());
FlightRouter.use(express.urlencoded({extended:false}));


FlightRouter.post('/add',FlightControl.addFlight);

FlightRouter.post('/Search',FlightControl.searchFlight);


app.post('/Search', function (req, res) {
    res.send('POST request to the homepage')
    console.log("Hamamamma");
  })
  

module.exports=FlightRouter;