const { Query } = require('mongoose');
const Flight = require('../models/Flight');
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
      dateFlight: req.body.dateFlight,

    });
  flight.save().then((result) => {
    // console.log(result.data);

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
      console.log("Deleted User : ", docs);

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
  console.log(req.body.FlightNumber.length);
  console.log(req.body.toAir);
  console.log(req.body);
  var Numb = '';
  if (req.body.FlightNumber.length == 0) {
    Numb = '';
  }
  else {
    Numb = req.body.FlightNumber
  }

  var arr = convertTime12to24(req.body.arrTime);
  var dep = convertTime12to24(req.body.depTime);



  var attrib = { FlightNumber: req.body.FlightNumber, toAir: req.body.toAir, fromAir: req.body.fromAir, dateFlight: req.body.dateFlight, depTime: req.body.depTime, arrTime: req.body.arrTime };
  //var attrib2 =  [FlightNumber = req.body.FlightNumber, toAir = req.body.toAir, fromAir = req.body.fromAir,dateFlight =req.body.dateFlight, depTime =req.body.depTime,arrTime = req.body.arrTime];

  var fil = "";
  
  if (attrib.FlightNumber.length != 0)
    fil += '"FlightNumber" : ' + attrib.FlightNumber + ((attrib.toAir.length != 0)  || (attrib.fromAir.length != 0)|| (attrib.dateFlight.length != 0) ||   (attrib.depTime.length != 0) || (attrib.arrTime.length != 0) ? "," : "");

  if (attrib.toAir.length != 0)
    fil += '"toAir" : ' +  '"' +attrib.toAir + '"' + ((attrib.fromAir.length != 0)|| (attrib.dateFlight.length != 0) ||   (attrib.depTime.length != 0) || (attrib.arrTime.length != 0) ? "," : "");

  if (attrib.fromAir.length != 0)
    fil += '"fromAir" : ' + '"' + attrib.fromAir + '"' + ((attrib.dateFlight.length != 0) || (attrib.depTime.length != 0) || (attrib.arrTime.length != 0) ? "," : "");

  if (attrib.dateFlight.length != 0)
    fil += '"dateFlight" : ' + '"' + attrib.dateFlight + '"' + ((attrib.depTime.length != 0) || (attrib.arrTime.length != 0)  ? "," : "");

  if (attrib.depTime.length != 0)
    fil += '"depTime" : ' + '"' + attrib.depTime + '"'  + ((attrib.arrTime.length != 0) ? "," : "");

  if (attrib.arrTime.length != 0)
    fil += '"arrTime" : ' + '"' + attrib.arrTime + '"'; 

    console.log("BEFORE");
    console.log(fil);
    console.log("AFTER");

  var filterObj = JSON.parse('{' + fil + '}');

  console.log(filterObj);

  Flight.find(filterObj)
    .then(result => {
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

exports.editFlight = (req, res) => {
  Flight.findOneAndUpdate({ FlightNumber: req.body.backFlightNumber }, {
    $set: {
      FlightNumber: req.body.FlightNumber,
      toAir: req.body.toAir,
      fromAir: req.body.fromAir,
      noEconomySeats: req.body.noEconomySeats,
      noBusinessSeats: req.body.noBusinessSeats,
      noFirstSeats: req.body.noFirstSeats,
      arrTime: req.body.arrTime,
      depTime: req.body.depTime,
      DateFlight: req.body.DateFlight,

    }
  }, { new: true }, (err, doc) => {
    if (err) {
      console.log("Something wrong when updating data!");
    }

    console.log(doc);
  });
}
