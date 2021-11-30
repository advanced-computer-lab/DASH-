const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req,res,next){ 
    const token = req.header("x-auth-token");

    //if there is no token
    if(!token)return res.json({msg:"No token , authorization denied"});
    try{
        //if there is a token ,then verify
        const decoded = jwt.verify(token,config.get("jwtSecret"));
        //Add user from payload
        req.user = decoded;
        next();

    }catch(e){
        return res.json({msg:"Token is not valid"});
    }

}

module.exports = auth;