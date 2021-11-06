const { appendFile } = require('fs');
const Flight = require('../models/Flight');

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
    console.log("I ❤ Shazaaaa");
   
  }
  
   
exports.searchFlight = (req, res) =>
{

  var searchId = req.body.id;
  var flight = [];

  Flight.find({FlightNumber : searchId}).then(result=>{
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(result, null, 4));
  });

  //User.find({FlightNumber:searchId},function (err,docs){
  //  if (err){
  //    console.log(err);
  //  }
  //  else{
  //    flight=docs;
  //    res.header("Content-Type",'application/json');
  //    res.send(JSON.stringify(flight));
  //    
  //  }
  //});
}
  
exports.findFlight = (req, res) =>
{

 Flight.find({FlightNumber : req.body.FlightNumber },function(err,docs){
   if(err){}
   else {
     res.send(JSON.stringify(docs.length));
   }
});

}

exports.deleteFlight = (req,res)=>{
   
 
 deletedId=req.body.data;
 Flight.findOneAndDelete({FlightNumber:deletedId }, function (err, docs) {
   if (err){
      console.log(err);
   }
   else{
       console.log("Deleted User : ", docs);
       
   }
});
}

exports.getAllFlights = (req , res)=>{
 Flight.find().then(result=>{
     res.header("Content-Type",'application/json');
     res.send(JSON.stringify(result, null, 4));
 });

}
