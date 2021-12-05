const User = require('../models/User');
const Ticket = require('../models/Ticket')
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
        text: 'You\'ve cancled flight Number: ' + flightID + "\nTicket Number: " + ticketNumber + "\nAn Amount of  " + price + " will be refunded"
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
    var attrib = { FirstName: req.body.FirstName, LastName: req.body.LastName, Email: req.body.Email, Passportnumber: req.body.Passportnumber };
    var ad = "";
    if (attrib.FirstName.length != 0) {
        ad += '"FirstName":' + '"' + attrib.FirstName + '"' + ((attrib.LastName.length != 0) || (attrib.Email.length != 0) || (attrib.Passportnumber.length != 0) ? "," : "");
    }
    if (attrib.LastName.length != 0) {
        ad += '"LastName":' + '"' + attrib.LastName + '"' + ((attrib.Email.length != 0) || (attrib.Passportnumber.length != 0) ? "," : "");
    }
    if (attrib.Email.length != 0) {
        ad += '"Email" : ' + '"' + attrib.Email + '"';
        Ticket.findOneAndUpdate({Email:req.body.UserMail} , {$set:{Email:attrib.Email}} , {new:true} ,(err,doc) =>{
            console.log(doc)
        } )

    }
    console.log(ad);

    var filterObj = JSON.parse('{' + ad + '}');
    console.log(filterObj);
    console.log(req.body.UserMail);

    User.findOneAndUpdate({ Email: req.body.UserMail }, { $set: filterObj }, { new: true }, (err, doc) => {
        console.log(doc);

    })

}


