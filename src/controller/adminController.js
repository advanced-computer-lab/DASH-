const Admin=require('../models/Admin');
const Flight = require('../models/Flight');

const home=(req,res)=>
{
    res.send('Hello world');
    res.end();
};

const getAllFlights = (req,res)=>{
    Flight.find().then((result)=>{
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(result, null, 4));
    });
};

const getAllAdmins =(req,res)=>{
    Admin.find().then((result)=>{
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(result, null, 4));
       // console.log(result);
    });

}
const signin = (req,res)=>{
    Admin.find({$and : [{Email : req.body.Email} , {Password : req.body.Password }]},function(err,docs){
        if(err){}
        else {
          res.send(JSON.stringify(docs.length));
        }
    });

}
    

module.exports={
    home,
    getAllAdmins,
    getAllFlights,
    signin
};