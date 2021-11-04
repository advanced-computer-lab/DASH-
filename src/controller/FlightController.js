const Flight = require('../models/Flight');
exports.addFlight = (req, res) =>
 {
    
    const flight = new Flight(
     { 
         flNumb : req.body.id,
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

    }
  