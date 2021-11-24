const express = require("express");
const userController = require("../controller/userController");
const flightController= require("../controller/FlightController");
const userRouter = express.Router();
userRouter.use(express.json());
userRouter.use(express.urlencoded({extended:false}));





userRouter.get('/getFlights' , flightController.getAllFlights);









module.exports = userRouter;