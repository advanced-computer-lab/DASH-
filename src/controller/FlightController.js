const Flight = require('../models/Flight');

exports.addFlight = (req, res) =>
 {
   
  Flight.count({}, function( err, count){
    const flight = new Flight(
      { 
        
          id : count +1,
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
    

})
  


    
    

    }

    exports.getallFlights = (req, res) =>
 {
   Flight.find().then((result)=>{
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(result, null, 4));
});
 }
  