const express = require("express");
const ticketController = require("../controller/ticketController");
const TicketRouter = express.Router();
TicketRouter.use(express.json());
TicketRouter.use(express.urlencoded({extended:false}));







module.exports = TicketRouter;