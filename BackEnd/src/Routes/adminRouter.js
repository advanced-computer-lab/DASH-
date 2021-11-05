const express = require("express");
const adminController = require("../Controller/adminController");
const adminRouter = express.Router();
adminRouter.use(express.json());
adminRouter.use(express.urlencoded({extended:false}));


adminRouter.get('/',adminController.home);
//adminRouter.get('/getFlights',adminController.getAllFlights);
adminRouter.get('/getAdmins',adminController.getAllAdmins);

module.exports = adminRouter;