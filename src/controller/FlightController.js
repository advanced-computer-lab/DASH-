const { appendFile } = require('fs');
const User = require('../models/Flight');

exports.addFlight = (req, res) =>
 {
  
    const flight = new Flight(
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
     flight.save().then((result)=>{
      // console.log(result.data);
     
  }).catch((err)=>
  {
    console.log(err);  
  });
  
    }
   
exports.serachFlight = (req, res) =>
{
  var searchId = req.body.id;
  console.log(searchId);
  var flight="";
  User.find({id:searchId},function (err,docs){
    if (err){
      console.log(err);
    }
    else{
      flight=docs;
      console.log(flight);
    }
  });
  res.json({flightValue: flight});
  
}
  