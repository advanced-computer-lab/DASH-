const express = require("express");
const userController = require("../controller/userController");
const flightController = require("../controller/FlightController");
//const verify = rqueire("../utlis/jwt");
const userRouter = express.Router();
userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: false }));
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require("config");
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");


//register function

userRouter.post('/register', (req, res) => {
    const { FirstName, LastName, Password, Email, Passportnumber, Type, DateOB } = req.body;

    // const FirstName=req.body.FirstName;
    // const LastName= req.body.LastName;
    // const Password= req.body.Password;
    // const Email=req.body.Email;
    // const Passportnumber= req.body.Passportnumber;
    // const Type=req.body.Type;
    // const DateOB=req.body.DateOB;

    User.findOne({ Email: Email })
        .then(user => {
            if (user) return res.status(400).json({ msg: "Email already exists" });

            const new_user = new User({
                FirstName,
                LastName,
                Password,
                Email,
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
                                { Email: user.Email },
                                config.get("jwtSecret"),
                                { expiresIn: 3600 },
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

            bcrypt.compare(Password , user.Password)
            .then(isMatch=>{
                if(!isMatch) return res.json({msg:"Invalid Password"});

                jwt.sign(
                    { Email: user.Email },  
                    config.get("jwtSecret"),
                    { expiresIn: 3600 },
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

userRouter.post('/type',auth,(req,res)=>{
    User.findOne({Email:req.body.Email})
    .then(user=>{
        res.send(user.Type);
    })
})



//Function to add flight to my flights

//userRouter.post('/book',)












module.exports = userRouter;