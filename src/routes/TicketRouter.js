const express = require("express");
const ticketController = require("../controller/ticketController");
const Ticket = require("../models/Ticket");
const TicketRouter = express.Router();
TicketRouter.use(express.json());
TicketRouter.use(express.urlencoded({extended:false}));


TicketRouter.post('/book' , (req,res)=>{
    const new_ticket = new Ticket({
        Email:req.body.FlightNumber,
        FlightNumber:Number(req.body.FlightNumber),
        BusinessSeatAdult:Number(req.body.AdultB),
        FirstSeatAdult:Number(req.body.AdultF),
        EconomySeatsAdult:Number(req.body.AdultE),
        BusinessSeatChild:Number(req.body.ChildB),
        FirstSeatChild:Number(req.body.ChildF),
        EconomySeatsChild:Number(req.body.ChildE),
    });
   // console.log(req.body);
   // console.log(new_ticket)
    new_ticket.save()
    .then(()=> console.log("Success")
    ).catch((err)=>console.log(err))
})




module.exports = TicketRouter;