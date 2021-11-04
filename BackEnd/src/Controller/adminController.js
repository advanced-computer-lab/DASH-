const Admin=require('../Models/Admin');
const Flight = require('../Models/Flight');

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
    

module.exports={
    home,
    getAllAdmins,
    getAllFlights
};