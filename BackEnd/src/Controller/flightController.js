const Flight = require('../Models/flight');
exports.addFlight = (req, res) =>
 {
  

    const flight = new Flight(
     { 
       
         id : req.body.id,
         toAir : req.body.toAir,
        fromAir : req.body.fromAir,
         noEconomySeats : req.body.econ,
         noBusinessSeats : req.body.business,
         noFirstSeats : req.body.first,
         depTime : req.body.dep,
         arrTime :req.body.arr,
         dateFlight :req.body.date, 
        
     });
     flight.save().then((result)=>{
       console.log(result.data);
     
  }).catch((err)=>
  {
    console.log(err);  
  });

    }


 
exports.getAllFlights = (req , res)=>{
    Flight.find().then(result=>{
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(result, null, 4));
    });

};   


exports.deleteFlight = (req,res)=>{
    Flight.findOneAndDelete({id:req.id }, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Deleted User : ", docs);
      }
  });
}
/*Flight.findOneAndDelete({id: 205 }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted User : ", docs);
    }
});*/

//Flight.findOneAndUpdate

/*Flight.findOneAndUpdate({id: 112}, {$set:{id:444}}, {new: true}, (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }

    console.log(doc);
});*/