import '../Flight.css';
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


        <td>

            <IconButton onClick={() => { props.deleteFlight(props.flight.FlightNumber) }}><DeleteForeverIcon style={{ color: "white" }}></DeleteForeverIcon></IconButton>
            <IconButton onClick={() => {
                window.location = "http://localhost:3000/getFlights/editFlight" +
                    props.flight.FlightNumber + " " +
                    props.flight.toAir + " " +
                    props.flight.fromAir + " " +
                    props.flight.noEconomySeats + " " +
                    props.flight.noBusinessSeats + " " +
                    props.flight.noFirstSeats + " " +
                    props.flight.depTime + " " +
                    props.flight.arrTime + " "


            }}  ><EditIcon style={{ color: "white" }}></EditIcon></IconButton>
        </td>

    </tr>
)

class GetFlights extends Component {
    constructor(props) {
        super(props);
        this.deleteFlight = this.deleteFlight.bind(this);

        this.state = {
            flights: []
        };
        axios.get("http://localhost:8000/user/isAuth", {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            }
        }).then(res => {
            if (res.data == "Token is not valid") {
                alert("Token Expired LogIn Again");
                window.location = "/logIn";
            } 
        })
    }


    componentDidMount() {
        axios.get('http://localhost:8000/Flight/getAllFlights', {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        })
            .then((res) => {
                if (res.data == "Token is not valid") {
                    alert("Token expired log in again please");
                    window.location = "/logIn";
                } else {

                    this.setState({ flights: res.data });
                }

            })
            .catch((err) => {
                console.log(err);

            })
    }

    flightsList() {
        return (this.state.flights.map(currentFlight => {
            return <Flight flight={currentFlight} deleteFlight={this.deleteFlight} />
        }))
    }

    deleteFlight(FlightNumber) {
        if (window.confirm('Are you sure you want to delete this Flight from the database')) {
            // Save it!
            axios.post("http://localhost:8000/Flight/deleteFlight", { data: FlightNumber },{
                headers: {
                    "x-auth-token": localStorage.getItem("token")
                }
            }).then(
                res => {
                    if(res.data =="Token is not valid"){
                        alert("Token expired log in again please");
                        window.location="/logIn";
                    }
                }
            ).catch(err => { console.log(err) });
            this.setState({
                flights: this.state.flights.filter(element => element.FlightNumber !== FlightNumber)
            })
        } else {
            // Do nothing!

        }



    }



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
                                    <Nav.Link href="/add"><i class="fa fa-fighter-jet fa-lg"></i> Add flight </Nav.Link>
                                    <Nav.Link href="./search"><i class="fa fa-search fa-lg"></i> Search</Nav.Link>
                                    <Nav.Link href="/getFlights"><i class="fa fa-list fa-lg"></i> Flights List</Nav.Link>

                                    <Nav.Link href="/logIn" onClick={() => {
                                        localStorage.removeItem("token");
                                        localStorage.removeItem("Email");
                                        localStorage.removeItem("Type");
                                    }} className="position-absolute end-0"><i className="fa fa-sign-out fa-lg"></i> Logout</Nav.Link>

                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                </div>



                <br />

                <div className="row row-content  ">

                    <div className="col-12 ">

                        <Table className="table table-dark d-felx " striped bordered hover size="xs">
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





        )
    }
}

export default GetFlights