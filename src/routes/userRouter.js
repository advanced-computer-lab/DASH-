const express = require("express");
const userController = require("../controller/userController");
const flightController = require("../controller/FlightController");
//const verify = require("../utlis/jwt");
const userRouter = express.Router();
userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: false }));
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require("config");
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");
const dotenv = require('dotenv');
dotenv.config();


//register function


userRouter.post('/ChangePassword', auth ,(req, res) => {

    const { Password, Email } = req.body;
    console.log(`OldPassword: ${Password}`)

    User.findOne({ Email: Email })
        .then(user => {

            //create salt and hash 
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(Password, salt, (err, hash) => {
                    if (err) throw err;
                    user["Password"] = hash;
                    user.save()
                        .then(user => {

                            console.log(`New Password: ${hash}`)


                        })
                })
            })
        })
}

)

userRouter.post('/register', (req, res) => {
 
    const { FirstName, LastName, Password, Email, Username, CountryCode, Address, Telephone, Passportnumber, Type, DateOB } = req.body;
    User.findOne({ Email: Email })
        .then(user => {
            if (user) return res.status(400).json({ msg: "Email already exists" });
            console.log(Username)
            const new_user = new User({
                FirstName,
                LastName,
                Password,
                Email,
                Username,
                Address,
                CountryCode,
                Telephone,
                Passportnumber,
                Type,
                DateOB
            });

            //create salt and hash 
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(new_user.Password, salt, (err, hash) => {
                    if (err) throw err;
                    new_user.Password = hash;
                    new_user.save()
                        .then(user => {

                            jwt.sign(
                                { Email: user.Email,
                                    Username : user.Username
                                },
                                process.env.ACCESS_TOKEN_SECRET,
                                { expiresIn: "1000s" },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({

                                        token: token,
                                        user: {
                                            id: user.id,
                                            Email: user.Email
                                        }
                                    }
                                    )
                                }
                            )

                        })
                })
            })
        })
})





//login

userRouter.post('/logIn', (req, res) => {
    const { Email, Password, } = req.body;
    // const FirstName=req.body.FirstName;
    // const LastName= req.body.LastName;
    // const Password= req.body.Password;
    // const Email=req.body.Email;
    // const Passportnumber= req.body.Passportnumber;
    // const Type=req.body.Type;
    // const DateOB=req.body.DateOB;


    User.findOne({ Email: Email })
        .then(user => {
            if (!user) return res.json({ msg: "Email does not exists" });

            bcrypt.compare(Password, user.Password)
                .then(isMatch => {
                    if (!isMatch) return res.json({ msg: "Invalid Password" });
                    jwt.sign(
                        { Email: user.Email,
                            Username : user.Username
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '4000s' },
                        (err, token) => {
                            if (err) throw err;
                            res.json({

                                token: token,
                                user: {
                                    id: user.id,
                                    Email: user.Email
                                }
                            }
                            )
                        }
                    )


                })

        })

})


// userRouter.get('/auth',auth,(req,res)=>{
//     User.findById(req.user.id)
//     .select("-Password")
//     .then(user =>res.json("blabizo"));
// })

userRouter.post('/type', auth,  (req, res) => {
    User.find({ Email: req.user.Email }, function (err, docs) {
        if (err) { throw err }
        else {
            res.send(JSON.stringify(docs[0].Type));
        }
    })
    // .then(user=>{
    //     if(user.Type){
    //         res.send({msg:"User"});

    //     }
    // }

    // User.find({ Email: req.body.Email }, function (err, docs) {
    //     if (err) { }
    //     else {
    //         res.send(JSON.stringify(docs.length));
    //     }
    // });
})



//Function to add flight to my flights

//userRouter.post('/book',)


userRouter.get('/isAuth',auth , (req,res)=>{
    
})


userRouter.post('/EditUser',auth, userController.EditUser);
userRouter.post('/FindEmail' , userController.findUser);
userRouter.post('/FindUsername', userController.findUserName);
userRouter.post('/FindInfo',auth, userController.findUserInfo);
userRouter.post('/SendEmail', auth ,userController.SendEmail)
userRouter.post('/SendEmailDetails', auth , userController.SendEmailDetails)
userRouter.post('/SendEmailPay', auth , userController.SendEmailPay)






module.exports = userRouter;