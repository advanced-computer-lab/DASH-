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
  console.log(req.body);
  var Numb = '' ;
  if (req.body.FlightNumber.length == 0){
    Numb = '' ;
  }
  else {
    Numb = req.body.FlightNumber
  }
  
  var arr = convertTime12to24(req.body.arrTime);
  var dep = convertTime12to24(req.body.depTime);
  
  Flight.find({FlightNumber: req.body.FlightNumber,toAir:req.body.toAir,fromAir:req.body.fromAir,dateFlight:req.body.dateFlight,
    depTime:dep,arrTime:arr  })

  .then(result =>{
    res.send(JSON.stringify(result, null, 4));
    console.log(result);
    
    
  }
    
  )
}




const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
}

exports.editFlight =(req,res)=> {Flight.findOneAndUpdate({FlightNumber:req.body.backFlightNumber}, {$set:{FlightNumber:req.body.FlightNumber,
  toAir:req.body.toAir,
  fromAir:req.body.fromAir,
  noEconomySeats:req.body.noEconomySeats,
  noBusinessSeats:req.body.noBusinessSeats,
  noFirstSeats:req.body.noFirstSeats,
  arrTime:req.body.arrTime,
  depTime:req.body.depTime,
  DateFlight:req.body.DateFlight,
  
  }}, {new: true}, (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }
  
    console.log(doc);
  });}
  