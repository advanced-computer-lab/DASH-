const User = require('../models/Flight');
exports.addFlight = (req, res) =>
 {
    
    const flight = new flight(
     { 
       
         id : req.body.id,
         toAir : req.body.to,
         fromAir : req.body.from,
         noEconomySeats : req.body.econ,
         noBusinessSeats : req.body.business,
         noFirstSeats : req.body.first,
         depTime : req.body.dep,
         arrTime :req.body.arr,
         dateFlight :req.body.date,
     });
      flight.save(function(err,data){
          if(err) throw err;
            console.log(data);
      });
      console.log("Hamada Normal")
    }
  

exports.serachFlight = (req, res) =>
 {
    console.log("I ❤ Shazaaaa");
   
  }
  