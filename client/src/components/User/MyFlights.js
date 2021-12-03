import { Component } from "react";
import axios from "axios";
import { IconButton } from '@mui/material';


class MyFlights extends Component{
    constructor(props){
        super(props);
        this.submit = this.submit.bind(this);
        this.flightlist = this.flightlist.bind(this);
        
        this.state = {
            MyFlight : [],
        };
     
        

    }
    
    submit(){
        var array = [] ;
        console.log("enter");
    const temp = {
        mail :localStorage.getItem("Email") ,
    }
    axios.post('http://localhost:8000/ticket/myFlights' , temp)
    .then( (res) => {
        
         this.setState({MyFlight : res.data})
            
              
        
        
        
    }
        
    )

    }

    flightlist(){
        console.log("asdasdas")
       
            return (this.state.MyFlight.map(currentFlight => {
                return <p>{currentFlight} </p>
            }))
        
    }
    

    render(){
        
        
        return(
            <body>
            
            <button onClick={this.submit }>Show details</button>
             
               <div>
                   {this.flightlist()}
               </div>
            </body>
        )       
        







    }

}







export default MyFlights;