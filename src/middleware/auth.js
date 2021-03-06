const dotenv = require('dotenv');
dotenv.config();
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.header("x-auth-token");
    const guest = req.header("guest");
    console.log(guest);
    //if there is no token

    if (guest == "guest") {
        
        //res.json("isGuest");
        next();
    } else {
        if (!token) return res.json({ msg: "No token , authorization denied" });

        try {
            //if there is a token ,then verify
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            //Add user from payload
            req.user = decoded;
            next();

        } catch (e) {
            return res.json("Token is not valid");
        }
    }

}

module.exports = auth;