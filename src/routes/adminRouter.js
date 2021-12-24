const express = require("express");
const adminController = require("../controller/adminController");
const auth = require("../middleware/auth");
const adminRouter = express.Router();
adminRouter.use(express.json());
adminRouter.use(express.urlencoded({extended:false}));




adminRouter.get('/', auth ,adminController.home);
//adminRouter.get('/getFlights',adminController.getAllFlights);
adminRouter.get('/getAdmins', auth ,adminController.getAllAdmins);

module.exports = adminRouter;