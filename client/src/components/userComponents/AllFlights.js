import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import { Component } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Navbar, Nav, Container, Table } from 'react-bootstrap';

const Flight = (props) => (
    <tr >
        <td>{props.flight.FlightNumber}</td>
        <td>{props.flight.toAir}</td>
        <td>{props.flight.fromAir}</td>
        <td>{props.flight.noEconomySeats}</td>
        <td>{props.flight.noBusinessSeats}</td>
        <td>{props.flight.noFirstSeats}</td>
        <td>{props.flight.depTime}</td>
        <td>{props.flight.arrTime}</td>
        <td>{props.flight.baggageallowance}</td>
        <td>{props.flight.priceEconomy}</td>
        <td>{props.flight.pricebusiness}</td>
        <td>{props.flight.priceFirst}</td>
        <td>{props.flight.Type}</td>
        


        <td>

            <IconButton onClick={() => { props.bookFlight(props.flight.FlightNumber) }}><DeleteForeverIcon style={{ color: "white" }}></DeleteForeverIcon></IconButton>
            <IconButton onClick={() => {
                // window.location = "http://localhost:3000/getFlights/editFlight" +
                //     props.flight.FlightNumber + " " +
                //     props.flight.toAir + " " +
                //     props.flight.fromAir + " " +
                //     props.flight.noEconomySeats + " " +
                //     props.flight.noBusinessSeats + " " +
                //     props.flight.noFirstSeats + " " +
                //     props.flight.depTime + " " +
                //     props.flight.arrTime + " "


            }}  ><EditIcon style={{ color: "white" }}></EditIcon></IconButton>
        </td>

    </tr>
)

class AllFlights extends Component {
    constructor(props) {
        super(props);
        this.bookFlight = this.bookFlight.bind(this);

        this.state = {
            flights: []
        };
    }


    componentDidMount() {
        axios.get('http://localhost:8000/Flight/getAllFlights')
            .then((res) => {
                this.setState({ flights: res.data });

            }) 
            .catch((err) => {
                console.log(err);

            })
    }

    flightsList() {
        return (this.state.flights.map(currentFlight => {
            return <Flight flight={currentFlight} bookFlight={this.bookFlight()} />
        }))
    }

    bookFlight(){

    }

    // deleteFlight={this.deleteFlight}
    // deleteFlight(FlightNumber) {
    //     if (window.confirm('Are you sure you want to delete this Flight from the database')) {
    //         // Save it!
    //         axios.post("http://localhost:8000/Flight/deleteFlight", { data: FlightNumber }).then(
    //             res => (console.log(res.data))
    //         ).catch(err => { console.log(err) });
    //         this.setState({
    //             flights: this.state.flights.filter(element => element.FlightNumber !== FlightNumber)
    //         })
    //     } else {
    //         // Do nothing!

    //     }



    // }



    render() {
        return (



            <div className="container-fluid">
                <div className="row">

                    <Navbar expand="sm" bg="dark" variant="dark">
                        <Container fluid>

                            <Navbar.Brand href="./">Dash</Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                <Nav navbarScroll className="me-auto">
                                    <Nav.Link href="/"><i className="fa fa-home fa-lg"></i> Home</Nav.Link>
                                    <Nav.Link href="./search"><i class="fa fa-search fa-lg"></i> Search</Nav.Link>
                                    <Nav.Link href="/user/all_flights"><i class="fa fa-list fa-lg"></i> Flights List</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                </div>



                <br />

                <div className="row row-content  ">

                    <div className="col-12 ">

                        <Table className="table table-dark d-felx fluid" striped bordered hover size="xs" >
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
                                    <th>Baggage Allowance</th>
                                    <th>Economy Seat Price</th>
                                    <th>Bussines Class Seat Price</th>
                                    <th>First Class Seat Price</th>
                                    <th>Type</th>
                                    <th class="text-center" style={{width:100}}>Action</th>
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





        )
    }
}

export default AllFlights