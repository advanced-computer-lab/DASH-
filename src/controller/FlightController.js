const Flight = require('../models/Flight');
const Ticket = require('../models/Ticket');


exports.addFlight = (req, res) => {


  const flight = new Flight(
    {

      FlightNumber: req.body.FlightNumber,
      toAir: req.body.toAir,
      fromAir: req.body.fromAir,
      noEconomySeats: req.body.noEconomySeats,
      noBusinessSeats: req.body.noBusinessSeats,
      noFirstSeats: req.body.noFirstSeats,
      depTime: req.body.depTime,
      arrTime: req.body.arrTime,
      baggageallowance: req.body.baggageallowance,
      pricebusiness: req.body.pricebusiness,
      priceEconomy: req.body.priceEconomy,
      priceFirst: req.body.priceFirst,
      AvailE: req.body.AvailE,
      AvailB: req.body.AvailB,
      AvailF: req.body.AvailF,

    });
  flight.save().then((result) => {


  }).catch((err) => {
    console.log(err);
  });

}

exports.findFlight = (req, res) => {

  Flight.find({ FlightNumber: req.body.FlightNumber }, function (err, docs) {
    if (err) { }
    else {
      res.send(JSON.stringify(docs.length));
    }
  });

}

exports.deleteFlight = (req, res) => {


  deletedId = req.body.data;
  Flight.findOneAndDelete({ FlightNumber: deletedId }, function (err, docs) {
    if (err) {
      console.log(err);
    }
    else {


    }
  });
}

exports.getAllFlights = (req, res) => {
  Flight.find().then(result => {
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(result, null, 4));
  });

};

exports.getFlightbyNumb = (req, res) => {
  var Numb = '';
  if (req.body.FlightNumber.length == 0) {
    Numb = '';
  }
  else {
    Numb = req.body.FlightNumber
  }

  var arr = convertTime12to24(req.body.arrTime);
  var dep = convertTime12to24(req.body.depTime);
  



  var attrib = { FlightNumber: req.body.FlightNumber, toAir: req.body.toAir, fromAir: req.body.fromAir, depTime: req.body.depTime, arrTime: req.body.arrTime ,AvailE : req.body.AvailE , AvailB : req.body.AvailB , AvailF : req.body.AvailF };
  //var attrib2 =  [FlightNumber = req.body.FlightNumber, toAir = req.body.toAir, fromAir = req.body.fromAir,dateFlight =req.body.dateFlight, depTime =req.body.depTime,arrTime = req.body.arrTime];

  var fil = "";

  if (attrib.FlightNumber.length != 0)
    fil += '"FlightNumber" : ' + attrib.FlightNumber + ((attrib.toAir.length != 0) || (attrib.fromAir.length != 0) || (attrib.depTime.length != 0) || (attrib.arrTime.length != 0) || (attrib.AvailE.length!=0) || (attrib.AvailB.length!=0) || (attrib.AvailF.length!=0) ? "," : "");

  if (attrib.toAir.length != 0)
    fil += '"toAir" : ' + '"' + attrib.toAir + '"' + ((attrib.fromAir.length != 0) || (attrib.depTime.length != 0) || (attrib.arrTime.length != 0) || (attrib.AvailE.length!=0) || (attrib.AvailB.length!=0) || (attrib.AvailF.length!=0) ? "," : "");

  if (attrib.fromAir.length != 0)
    fil += '"fromAir" : ' + '"' + attrib.fromAir + '"' + ((attrib.depTime.length != 0) || (attrib.arrTime.length != 0) || (attrib.AvailE.length!=0) || (attrib.AvailB.length!=0) || (attrib.AvailF.length!=0) ? "," : "");

  /* if (attrib.dateFlight.length != 0)
     fil += '"dateFlight" : ' + '"' + attrib.dateFlight + '"' + ((attrib.depTime.length != 0) || (attrib.arrTime.length != 0)  ? "," : "");*/

  if (attrib.depTime.length != 0)
    fil += '"depTime" : ' + '"' + attrib.depTime + '"' + ((attrib.arrTime.length != 0) || (attrib.AvailE.length!=0) || (attrib.AvailB.length!=0) || (attrib.AvailF.length!=0) ? "," : "");

  if (attrib.arrTime.length != 0)
    fil += '"arrTime" : ' + '"' + attrib.arrTime + '"' +( (attrib.AvailE.length!=0) || (attrib.AvailB.length!=0) || (attrib.AvailF.length!=0) ? "," : "");
  if (attrib.AvailE.length != 0)
    fil += '"AvailE": '+   '{' + '"$gte" : '  + attrib.AvailE   + '}'   +(  (attrib.AvailB.length!=0) || (attrib.AvailF.length!=0) ? "," : "");
  if (attrib.AvailB.length != 0)
    fil += '"AvailB" : ' + '{' + ' "$gte" :'+ attrib.AvailB  + '}' +( (attrib.AvailF.length!=0) ? "," : "");
  if (attrib.AvailF.length != 0)
    fil += '"AvailF" : ' + '{' + '"$gte" :' +attrib.AvailF + '}'  ;  
  
  
  var filterObj = JSON.parse('{' + fil + '}');
  



  Flight.find(filterObj)
    .then(result => {
      res.send(JSON.stringify(result, null, 4));



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

exports.editFlight = (req, res) => {
  var attrib = { FlightNumber: req.body.FlightNumber, toAir: req.body.toAir, fromAir: req.body.fromAir, noEconomySeats: req.body.noEconomySeats, noBusinessSeats: req.body.noBusinessSeats, noFirstSeats: req.body.noFirstSeats, depTime: req.body.depTime, arrTime: req.body.arrTime };
  //var attrib2 =  [FlightNumber = req.body.FlightNumber, toAir = req.body.toAir, fromAir = req.body.fromAir,dateFlight =req.body.dateFlight, depTime =req.body.depTime,arrTime = req.body.arrTime];

  var fil = "";

  if (attrib.FlightNumber.length != 0)
    fil += '"FlightNumber" : ' + attrib.FlightNumber + ((attrib.toAir.length != 0) || (attrib.fromAir.length != 0) || (attrib.depTime.length != 0) || (attrib.arrTime.length != 0) || (attrib.noEconomySeats.length != 0) || (attrib.noFirstSeats.length != 0) || (attrib.noBusinessSeats.length != 0) ? "," : "");

  if (attrib.toAir.length != 0)
    fil += '"toAir" : ' + '"' + attrib.toAir + '"' + ((attrib.fromAir.length != 0) || (attrib.depTime.length != 0) || (attrib.arrTime.length != 0) || (attrib.noEconomySeats.length != 0) || (attrib.noFirstSeats.length != 0) || (attrib.noBusinessSeats.length != 0) ? "," : "");

  if (attrib.fromAir.length != 0)
    fil += '"fromAir" : ' + '"' + attrib.fromAir + '"' + ((attrib.depTime.length != 0) || (attrib.arrTime.length != 0) || (attrib.noEconomySeats.length != 0) || (attrib.noFirstSeats.length != 0) || (attrib.noBusinessSeats.length != 0) ? "," : "");

  if (attrib.noEconomySeats.length != 0)
    fil += '"noEconomySeats" : ' + '"' + attrib.noEconomySeats + '"' + ((attrib.depTime.length != 0) || (attrib.arrTime.length != 0) || (attrib.noFirstSeats.length != 0) || (attrib.noBusinessSeats.length != 0) ? "," : "");
  if (attrib.noBusinessSeats.length != 0)
    fil += '"noBusinessSeats" : ' + '"' + attrib.noBusinessSeats + '"' + ((attrib.depTime.length != 0) || (attrib.arrTime.length != 0) || (attrib.noFirstSeats.length != 0) ? "," : "");

  if (attrib.noFirstSeats.length != 0)
    fil += '"noFirstSeats" : ' + '"' + attrib.noFirstSeats + '"' + ((attrib.depTime.length != 0) || (attrib.arrTime.length != 0) ? "," : "");

  if (attrib.depTime.length != 0)
    fil += '"depTime" : ' + '"' + attrib.depTime + '"' + ((attrib.arrTime.length != 0) ? "," : "");

  if (attrib.arrTime.length != 0)
    fil += '"arrTime" : ' + '"' + attrib.arrTime + '"';



  var filterObj = JSON.parse('{' + fil + '}');




  console.log(filterObj)




  Flight.findOneAndUpdate({ FlightNumber: req.body.backFlightNumber }, { $set: filterObj }, { new: true }, (err, doc) => {

  })
  /*Flight.findOneAndUpdate(filterObj)
    if (err) {
        console.log("Something wrong when updating data!");
    }
  
    console.log(doc);
  });*/


}

exports.showFlight = (req, res) => {
  Flight.find({ FlightNumber: req.body.FlightNumber }).then(result => {
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(result, null, 4));
  });

};


exports.getAllTickets = (req, res) => {
  Ticket.find({Email:req.body.Email}).then(result => {
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(result, null, 4));
  });

}