const express = require("express");
const ticketController = require("../controller/ticketController");
const Ticket = require("../models/Ticket");
const Flight = require("../models/Flight");
const TicketRouter = express.Router();
TicketRouter.use(express.json());
TicketRouter.use(express.urlencoded({extended:false}));


TicketRouter.post('/book' , (req,res)=>{
    const new_ticket = new Ticket({
        Email:req.body.Email,
        FlightNumber:Number(req.body.FlightNumber),
        BusinessSeatAdult:Number(req.body.AdultB),
        FirstSeatAdult:Number(req.body.AdultF),
        EconomySeatsAdult:Number(req.body.AdultE),
        BusinessSeatChild:Number(req.body.ChildB),
        FirstSeatChild:Number(req.body.ChildF),
        EconomySeatsChild:Number(req.body.ChildE),
        Price:Number(req.body.totalPrice),
        Departure:req.body.Departure,
        Arrival:req.body.Arrival,
        DepartureTime:req.body.DepartureTime,
        ArrivalTime:req.body.ArrivalTime,
    });
    console.log(req.body);
    console.log(new_ticket)
    new_ticket.save()
    .then(()=> console.log("Success")
    ).catch((err)=>console.log(err))
    Flight.findOne({FlightNumber:req.body.FlightNumber},function(err,flight){
        if(err) return res.send("Error");
        const updated={
            AvailE:Number(flight.AvailE)-(Number(req.body.AdultE)+Number(req.body.ChildE)),
            AvailB:Number(flight.AvailB)-(Number(req.body.ChildB)+Number(req.body.AdultB)),
            AvailF:Number(flight.AvailF)-(Number(req.body.ChildF)+Number(req.body.AdultF)),
        }
    
        Flight.findOneAndUpdate({FlightNumber:req.body.FlightNumber}, {$set:updated}, {new: true}, (err, doc) => {
            // console.log(doc);
             res.send("Dodo")   
         })    
    })
    

    
})
TicketRouter.post('/myFlights',ticketController.showmyFlights);




module.exports = TicketRouter;