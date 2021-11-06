import './Flight.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import { Component} from 'react';
import EditIcon from '@mui/icons-material/Edit';


const Flight = (props)=>(
    <tr >
        <td>{props.flight.FlightNumber}</td>
        <td>{props.flight.toAir}</td>
        <td>{props.flight.fromAir}</td>
        <td>{props.flight.noEconomySeats}</td>
        <td>{props.flight.noBusinessSeats}</td>
        <td>{props.flight.noFirstSeats}</td>
        <td>{props.flight.depTime}</td>
        <td>{props.flight.arrTime}</td>
        <td>{props.flight.dateFlight}</td>
        
        <td> 
            
            <IconButton onClick={()=>{ props.deleteFlight(props.flight.FlightNumber)  }}><DeleteForeverIcon style={{color:"white"}}></DeleteForeverIcon></IconButton>
            <IconButton onClick={()=>{  window.location = "http://localhost:3000/getFlights/editFlight"+
            props.flight.FlightNumber+" "+
            props.flight.toAir+" "+
            props.flight.fromAir+" "+
            props.flight.noEconomySeats+" "+
            props.flight.noBusinessSeats+" "+
            props.flight.noFirstSeats+" "+
            props.flight.depTime+" "+
            props.flight.arrTime+" "+
            props.flight.dateFlight

        
        }}  ><EditIcon  style={{color:"white"}}></EditIcon></IconButton>
              </td>

    </tr>
)

class GetFlights extends Component{
    constructor(props){
        super(props);
        this.deleteFlight= this.deleteFlight.bind(this);

        this.state={
            flights : []
        };
    }    


    componentDidMount(){
        axios.get('http://localhost:8000/Flight/getAllFlights')
            .then((res)=>{
                this.setState({flights:res.data});
                
            })
            .catch((err)=>{
                console.log(err);
              
            })
    }

    flightsList(){
        return( this.state.flights.map(currentFlight=>{
            return <Flight flight={currentFlight} deleteFlight = {this.deleteFlight} />
        }) )
    }

    deleteFlight(FlightNumber){
        if (window.confirm('Are you sure you want to delete this Flight from the database')) {
            // Save it!
            axios.post("http://localhost:8000/Flight/deleteFlight",{ data: FlightNumber}).then(
            res=>(console.log(res.data))
        ).catch(err=>{console.log(err )});
        this.setState({
            flights:this.state.flights.filter(element=>element.FlightNumber !== FlightNumber)
        })
          } else {
            // Do nothing!
           
          }
        
        
        
    }
    
    
   
    render(){
        return(
            <div className="container">
                
                <div className="row ">

                    <h1 className="col-12 align-self-center">Flights List</h1>
                </div>

                <div className="row row-header ">

                    <div className="col-12 ">

                        <table className="table table-dark d-felx">
                            <thead >
                                <tr >
                                    <th>Flight Number</th>
                                    <th>Arrival</th>
                                    <th>Departure</th>
                                    <th>Economy Seats</th>
                                    <th>Business Seats</th>
                                    <th>First Class Seats</th>
                                    <th>Departure Time</th>
                                    <th>Arrival Time</th>
                                    <th>Date Of Flight</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {this.flightsList()}
                                </tbody>
                
                            
                        </table>
                    </div>

                    <div className="col-12 col-md-6">
                        <h4>ahmed mostafa ahmed fawzy</h4>
                    </div>

                </div>
            </div>

        ) 
    }
}

export default GetFlights