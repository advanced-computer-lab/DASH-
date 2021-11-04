const Flight = require('../models/Flight');
exports.addFlight = (req, res) =>
 {
  

    const flight = new Flight(
     { 
       
         id : req.body.id,
         toAir : req.body.toAir,
         fromAir : req.body.fromAir,
         noEconomySeats : req.body.noEconomySeats,
         noBusinessSeats : req.body.noBusinessSeats,
         noFirstSeats : req.body.noFirstSeats,
         depTime : req.body.depTime,
         arrTime :req.body.arrTime,
         dateFlight :req.body.dateFlight,
        
     });
     flight.save().then((result)=>{
      // console.log(result.data);
     
  }).catch((err)=>
  {
    console.log(err);  
  });

    }
  