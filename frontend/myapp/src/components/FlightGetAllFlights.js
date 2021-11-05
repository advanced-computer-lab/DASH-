import styles from '../styles/Flight.css'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
import React from 'react';
import { Component, useState,useEffect ,setState} from 'react';


const Flight = (props)=>(
    <tr >
        <td>{props.flight.id}</td>
        <td>{props.flight.toAir}</td>
        <td>{props.flight.fromAir}</td>
        <td>{props.flight.noEconomySeats}</td>
        <td>{props.flight.noBusinessSeats}</td>
        <td>{props.flight.noFirstSeats}</td>
        <td>{props.flight.depTime}</td>
        <td>{props.flight.arrTime}</td>
        <td>{props.flight.dateFlight}</td>
        

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
        axios.get('http://localhost:8000/admins/flights/getAllFlights').
            then((res)=>{
                this.setState({flights:res.data});
                console.log("omk ar3a");
            })
            .catch((err)=>{
                console.log(err);
                console.log("omk ar3a");
            })
    }

    flightsList(){
        return( this.state.flights.map(currentFlight=>{
            return <Flight flight={currentFlight}  />
        }) )
    }

    deleteFlight(id){
        axios.delete("http://localhost:8000/admins/flights/deleteFlight"+id).then(
            res=>(console.log(res.data))
        );
        this.setState
        
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
                                    <th>ID</th>
                                    <th>Arrival</th>
                                    <th>Departure</th>
                                    <th>Economy Seats</th>
                                    <th>Business Seats</th>
                                    <th>First Class Seats</th>
                                    <th>Departure Time</th>
                                    <th>Arrival Time</th>
                                    <th>Date Of Flight</th>
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