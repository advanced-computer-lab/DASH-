import './Flight.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import { Component} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {Navbar, Nav,Container , Table} from 'react-bootstrap';

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

           <body className="">

    <div className="container">    

            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="./">Dash</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="./search">Search</Nav.Link>
                  <Nav.Link href="">Flights List</Nav.Link>
                </Nav>
                </Container>
              </Navbar>
  

            
            
                
                <br/>

                <div className="row row-header ">

                    <div className="col-12 ">

                        <Table className="table table-dark d-felx "  striped bordered hover size="xs">
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
                
                            
                        </Table>
                    </div>

                    <div className="col-12 col-md-6">
                        
                    </div>

                </div>
            </div>

           </body>



        ) 
    }
}

export default GetFlights