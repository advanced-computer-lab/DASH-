const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const bodyParser = require("body-parser");


// exports.signUp = async (req, res) => {
//     console.log(req.body);
//     const new_user = new User({
//         FirstName: req.body.FirstName,
//         LastName: req.body.LastName,
//         Password: req.body.Password,
//         Email: req.body.Email,
//         Passportnumber: req.body.PassportNumber,
//         Type: req.body.Type,
//         DateOB: req.body.DateOB,
//     });

//     const takenEmail = await User.findOne({ Email: new_user.Email });
//     if (takenEmail) {
//         res.json({ message: "Emial is already taken" });
//     } else {
//         new_user.Password = await bcrypt.hash(req.body.Password, 10);
//         console.log(new_user);
//         new_user.save().then((result) => {
//         }).catch((err) => {
//             console.log(err);
//         });
//         res.json({ message: "Success" });
//     }
// };

// exports.logIn = (req, res) => {
//     const userLoggedIn = req.body;
//     User.findOne({ Email: userLoggedIn.Email })
//         .then(dbUser => {
//             if (!dbUser) {
//                 return res.json({ message: "Invalid Email or Password" });
//             }
//             bcrypt.compare(userLoggedIn.Password, dbUser.Password)
//                 .then(isCorrect => {
//                     if (isCorrect) {
//                         const payload = {

//                             id: dbUser._id,
//                             Email: dbUser.Email,
//                         }
//                         jwt.sign(
//                             payload,
//                             process.env.JWT_SECRET,
//                             { expiresIn: 86400 },
//                             (err, token) => {
//                                 if (err) return res.json({ message: err })
//                                 return res.json({
//                                     message: "Success",
//                                     token: "Bearer" + token,
//                                 })
//                             }
//                         )
//                     }else{
//                         return res.json({
//                             message:"Invalid Email or Password"
//                         })
//                     }
//                 })
//         })
// }

// exports.findUser = (req, res) => {

//     User.find({ Email: req.body.Email }, function (err, docs) {
//         if (err) { }
//         else {
//             res.send(JSON.stringify(docs.length));
//         }
//     });

// }

exports.findUser = (req, res) => {

    User.find({ Email: req.body.Email }, function (err, docs) {
        if (err) { }
        else {
            res.send(JSON.stringify(docs.length));
        }
    });


}
exports.findUserName = (req, res) => {
    User.find({ Username: req.body.Username }, function (err, docs) {
        if (err) { }
        else {
            res.send(JSON.stringify(docs.length));
        }
    });


}


exports.SendEmailDetails = (req, res) => {

    var email = req.body.email
    var flightNumber = req.body.flightNumber
    var TicketNumber = req.body.TicketNumber
    var amount = req.body.Price;
    var SeatsE = JSON.parse(req.body.SeatsE);
    var SeatsB = JSON.parse(req.body.SeatsB);
    var SeatsF = JSON.parse(req.body.SeatsF);

    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'TeamDASHgedan@gmail.com',
            pass: 'Dash1234'
        }
    });

    console.log(SeatsE)
    console.log(SeatsF)
    console.log(SeatsB)

    const mailOptions = {
        from: 'TeamDASHgedan@gmail.com',
        to: email,
        subject: `Flight ${flightNumber} Details`,
        text: 'You\'ve Reserved flight Number: ' + flightNumber + " \nTicket Number: " + TicketNumber + "\nTotal Ticket's Price of " + amount + "$" +
            "\n\nThe Following Seats: are Reserved:" + "\n\n" +
            SeatsE.map(seat => {
                return `Seat: ${seat} in Economy Class\n`
            })

            + SeatsB.map(seat => {
                return `Seat: ${seat} in Business Class\n`
            })

            + SeatsF.map(seat => {
                return `Seat: ${seat} in First Class\n`
            })
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);

        }
    });

};

exports.SendEmailPay = (req, res) => {

    var email = req.body.token.email
    var last4 = req.body.token.card.last4
    var flightNumber = req.body.flightNumber
    var amount = req.body.amount
    var SeatsE = req.body.SeatsE
    var SeatsB = req.body.SeatsB
    var SeatsF = req.body.SeatsF

    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'TeamDASHgedan@gmail.com',
            pass: 'Dash1234'
        }
    });

    console.log(SeatsE)
    console.log(SeatsF)
    console.log(SeatsB)

    const mailOptions = {
        from: 'TeamDASHgedan@gmail.com',
        to: email,
        subject: 'Flight Reservation',
        text: 'You\'ve paid for flight Number: ' + flightNumber + " an Amount of " + amount + "$ with card ending with XXX XXX XXX " + last4 +
            "The Following Seats:" + "\n\n" +
            SeatsE.map(seat => {
                return `Seat: ${seat} in Economy Class\n`
            })
            + SeatsB.map(seat => {
                return `Seat: ${seat} in Business Class\n`
            })
            + SeatsF.map(seat => {
                return `Seat: ${seat} in First Class\n`
            })
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);

        }
    });

};


exports.SendEmail = (req, res) => {

    const flightID = req.body.flightID;
    const email = req.body.email;
    const price = req.body.Price;
    const ticketNumber = req.body.TicketNumber;

    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'TeamDASHgedan@gmail.com',
            pass: 'Dash1234'
        }
    });

    const mailOptions = {
        from: 'TeamDASHgedan@gmail.com',
        to: email,
        subject: 'Flight Cancellation',
        text: 'You\'ve canceled flight Number: ' + flightID + "\nTicket Number: " + ticketNumber + "\nAn Amount of  " + price + "$ will be refunded"
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

};


exports.findUserInfo = (req, res) => {

    User.find({ Email: req.body.Email }, function (err, docs) {
        if (err) { }
        else {
            res.send(JSON.stringify(docs));
        }
    });

}



exports.EditUser = (req, res) => {
    var attrib = { FirstName: req.body.FirstName, Username: req.body.Username, Address: req.body.Address, Telephone: req.body.Telephone, CountryCode: req.body.CountryCode, LastName: req.body.LastName, Email: req.body.Email, Passportnumber: req.body.Passportnumber };



    User.findOne({ Email: req.body.UserMail }, (err, docs) => {

        if (attrib.FirstName.length != 0)
            docs["FirstName"] = attrib.FirstName

        if (attrib.LastName.length != 0)
            docs["LastName"] = attrib.LastName

        if (attrib.Email.length != 0)
            docs["Email"] = attrib.Email

        if (attrib.Username.length != 0)
            docs["Username"] = attrib.Username

        if (attrib.Address.length != 0)
            docs["Address"] = attrib.Address

        if (attrib.Telephone.length != 0)
            docs["Telephone"] = attrib.Telephone

        if (attrib.CountryCode.length != 0)
            docs["CountryCode"] = attrib.CountryCode

        if (attrib.Passportnumber.length != 0)
            docs["Passportnumber"] = attrib.Passportnumber

        docs.save();

    })

}


