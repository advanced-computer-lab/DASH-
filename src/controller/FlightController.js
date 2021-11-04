const User = require('../models/Flight');
exports.addFlight = (req, res) =>
 {
<<<<<<< Updated upstream
    
    const flight = new flight(
=======
  
    const flight = new Flight(
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      flight.save(function(err,data){
          if(err) throw err;
            console.log(data);
      });
      console.log("Hamada Normal")
=======
     flight.save().then((result)=>{
      // console.log(result.data);
     
  }).catch((err)=>
  {
    console.log(err);  
  });
  
>>>>>>> Stashed changes
    }
  

exports.serachFlight = (req, res) =>
 {
    console.log("I ❤ Shazaaaa");
   
  }
  