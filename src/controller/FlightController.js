const Flight = require('../models/Flight');
exports.addFlight = (req, res) =>
 {
  

    const flight = new Flight(
     { 
       
         FlightNumber : req.body.FlightNumber,
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

};

exports.getFlightbyNumb = (req,res) =>{
  console.log(req.body.FlightNumber.length);
  console.log(req.body.toAir);
  var Numb = '' ;
  if (req.body.FlightNumber.length == 0){
    Numb = '' ;
  }
  else {
    Numb = req.body.FlightNumber
  }

  Flight.find({$or:[{FlightNumber: req.body.FlightNumber},{toAir:req.body.toAir},{fromAir:req.body.fromAir},{dateFlight:req.body.dateFlight},
    {depTime:req.body.depTime},{arrTime:req.body.arrTime}]})

  .then(result =>{
    res.send(JSON.stringify(result, null, 4));
    console.log(result);
    
  }
    
  )
}


  