import '../Flight.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import React from 'react';
import { IconButton } from '@mui/material';
import { Component } from 'react';
import { Navbar, Nav, Container, Table, Button, Modal } from 'react-bootstrap';

//import AddBoxIcon from '@mui/icons-material/AddBox';

var flightNumber = 0;

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
            <IconButton color="success" onClick={() => { props.handleModal(props.flight.FlightNumber) ; flightNumber = props.flight.FlightNumber; }}>Cancel Reservation</IconButton>

        </td>

    </tr>

)



class Flights extends Component {
    constructor(props) {
        super(props);
        this.handleModal = this.handleModal.bind(this);

        this.state = {
            flights: [],
            show: false,
            modalFlightNumber: ''

        };
    }

    handleModal(id) {
        this.setState({
            show: !this.state.show,
            modalFlightNumber: id,
        })
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
            return <Flight flight={currentFlight} handleModal={this.handleModal} />
        }))
    }

    pop(id) {

        alert(id);
    }

    DeleteFlight()
    {
        alert(flightNumber);
        axios.delete(`http://localhost:8000/delete/${flightNumber}`);
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
                                    <Nav.Link href="/user/home"><i className="fa fa-home fa-lg"></i> Home</Nav.Link>
                                    <Nav.Link href="/user/search"><i class="fa fa-search fa-lg"></i> Search</Nav.Link>
                                    <Nav.Link href="/user/all_flights"><i class="fa fa-list fa-lg"></i> Flights List</Nav.Link>
                                    <Nav.Link href=""><i className="fa fa-clipboard fa-lg"></i> My Flights</Nav.Link>
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

                    <div >
                        <Modal show={this.state.show}>
                            <Modal.Header>Confirmation Box</Modal.Header>
                            
                            <Modal.Body>
                                Are You Sure You want To Cancel Your Reservation?
                            </Modal.Body>
                            <form className="CancelFlight" onSubmit={this.submit} >
                            <button type="button" class="btn btn-danger" onClick={() => {
                                this.DeleteFlight();
                                alert("Reservation Cancelled Successfully");
                                 this.setState({
                                    show: false,
                                })
                            }}>Yes</button>
                            </form>
                            <button onClick={() => {this.setState({show: false,}); }} type="button" class="btn btn-secondary">No</button>
                           
                        </Modal>
                    </div>

                </div>
            </div>





        )
    }
}

export default Flights;