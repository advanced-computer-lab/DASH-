
const Ticket = require('../models/Ticket');


exports.showmyFlights= (req, res) =>{
    Ticket.find({ Email: req.body.mail }).then(result => {
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(result, null, 4));
      });

}