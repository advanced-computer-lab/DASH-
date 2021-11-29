const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.verify =(req,res,next)=>{
    const token = req.headers["x-access-token"]?.split('')[1];

    if(token){
        jwt.verify(token,process.env.PASSPORTSECRET,(err,decoded)=>{
            if(err) return res.json({
                isLoggedIn:false,
                message:"Failed To Authenticate"
            })
            req.user = {};
            req.user.id = decoded.id;
            req.user.Email = decoded.Email;
            next();
            
        })
    }else{
        res.json({message:"Incorrect Token Given",isLoggedIn:false});
    }
}