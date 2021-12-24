import '../Flight.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import React from 'react';
import { IconButton } from '@mui/material';
import { Component, useState } from 'react';
import { Navbar, Nav, Container, Table, Button, Modal } from 'react-bootstrap';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

//import AddBoxIcon from '@mui/icons-material/AddBox';

var flightNumber = 0;


const SendEmailDetails = (id, price, ticketNumber, SeatsArrayE, SeatsArrayB, SeatsArrayF) => (
    axios.post("http://localhost:8000/user/SendEmailDetails", { TicketNumber: ticketNumber, Price: price, flightNumber: id, email: localStorage.getItem("Email"), SeatsE: SeatsArrayE, SeatsB: SeatsArrayB, SeatsF: SeatsArrayF })
)

// const Edit = (props) => (


//     <Modal show={props.showEdit}>
//         <Modal.Header>

//             <b className="text-center">Reciept</b>
//             <Button onClick={() => { props.handleModalEdit(props.modalFlightNumber) ;  }} style={{ backgroundColor: "black" }}><CancelPresentationIcon style={{ color: 'white' }}></CancelPresentationIcon></Button>

//         </Modal.Header>
//         <Modal.Body>


//         </Modal.Body>

//     </Modal>

// )

const Flight = (props) => (
    <tr >
        <td>{props.ticket.TicketNumber}</td>
        <td>{props.ticket.FlightNumber}</td>
        <td>{props.ticket.Departure}</td>
        <td>{props.ticket.Arrival}</td>
        <td>{props.ticket.DepartureTime}</td>
        <td>{props.ticket.ArrivalTime}</td>

        {(JSON.parse(props.ticket.ReservedSeatsB).length != 0) ? <td>{props.ticket.BusinessSeatAdult + props.ticket.BusinessSeatChild}  [ {(JSON.parse(props.ticket.ReservedSeatsB).map(Seat => { return (Seat + " ") }))}]</td> : <td>-</td>}
        {(JSON.parse(props.ticket.ReservedSeatsE).length != 0) ? <td>{props.ticket.EconomySeatsAdult + props.ticket.EconomySeatsChild}  [ {(JSON.parse(props.ticket.ReservedSeatsE).map(Seat => { return (Seat + " ") }))}]</td> : <td>-</td>}
        {(JSON.parse(props.ticket.ReservedSeatsF).length != 0) ? <td>{props.ticket.FirstSeatAdult + props.ticket.FirstSeatChild}  [ {(JSON.parse(props.ticket.ReservedSeatsF).map(Seat => { return (Seat + " ") }))}]</td> : <td>-</td>}
        <td>{props.ticket.Price}</td>

        {/* <td>{props.flight.FlightNumber}</td>
        <td>{props.flight.toAir}</td>
        <td>{props.flight.fromAir}</td>
        <td>{props.flight.noEconomySeats}</td>
        <td>{props.flight.noBusinessSeats}</td>
        <td>{props.flight.noFirstSeats}</td>
        <td>{props.flight.depTime}</td>
        <td>{props.flight.arrTime}</td>
        <td>{props.flight.arrTime}</td> */}


        <td>
            <IconButton style={{ fontSize: 20, color: "white" }} onClick={() => { props.handleModal(props.ticket.FlightNumber, props.ticket._id, props.ticket.Price, props.ticket.TicketNumber); flightNumber = props.ticket.FlightNumber; }}><HighlightOffIcon></HighlightOffIcon>Cancel </IconButton>

            <IconButton style={{ color: "white", fontSize: 18 }} onClick={() => { SendEmailDetails(props.ticket.FlightNumber, props.ticket.Price, props.ticket.TicketNumber, props.ticket.ReservedSeatsE, props.ticket.ReservedSeatsB, props.ticket.ReservedSeatsF) }}><EmailIcon style={{ color: "white" }}></EmailIcon>Email Details &nbsp;</IconButton>
            <IconButton onClick={() => { props.handleModalEdit(props.ticket.FlightNumber, props.ticket._id, props.ticket.Price, props.ticket.TicketNumber); }} style={{ color: "white", fontSize: 18 }} ><EditIcon></EditIcon> &nbsp;</IconButton>
        </td>

    </tr>

)



class Reserve extends Component {
    constructor(props) {
        super(props);
        this.handleModal = this.handleModal.bind(this);
        this.handleModalEdit = this.handleModalEdit.bind(this);
        this.DeleteTicket = this.DeleteTicket.bind(this);
        this.onChangeAvailE = this.onChangeAvailE.bind(this);
        this.onChangeAvailB = this.onChangeAvailB.bind(this);
        this.onChangeAvailF = this.onChangeAvailF.bind(this);
        this.state = {
            tickets: [],
            show: false,
            showEdit: false,
            modalFlightNumber: '',
            flights: [],
            flightResult: [],
            ticketId: "",
            totalPrice: 0,
            TicketNumber: 0,
            currTicket: "",
            AvailE: '',
            AvailB: '',
            AvailF: '',
            arrTime: '',
            depTime: ''


        };
    }


    handleModal(id, ticketIdd, price, ticketNumber) {
        this.setState({
            show: !this.state.show,
            modalFlightNumber: id,
            ticketId: ticketIdd,
            totalPrice: price,
            ticketNum: ticketNumber
        })
    }

    handleModalEdit(id, ticketIdd, price, ticketNumber) {
        this.setState({
            showEdit: !this.state.showEdit,
            modalFlightNumber: id,
            ticketId: ticketIdd,
            totalPrice: price,
            ticketNum: ticketNumber
        })
    }

    componentDidMount() {
        axios.post('http://localhost:8000/Flight/getAllTickets', { Email: localStorage.getItem('Email') })
            .then((res) => {
                this.setState({ tickets: res.data });
            })
            .catch((err) => {
                console.log(err);

            })

        axios.get('http://localhost:8000/Flight/getAllFlights')
            .then((res) => {
                this.setState({ flights: res.data });
            })
            .catch((err) => {
                console.log(err);

            })
    }

    flightsList() {
        return (this.state.tickets.map(currentTicket => {
            return <Flight ticket={currentTicket} handleModal={this.handleModal} handleModalEdit={this.handleModalEdit} />
        }))
    }


    DeleteTicket() {
        axios.delete(`http://localhost:8000/delete/`,
            {
                data:
                {
                    flightNumber: this.state.modalFlightNumber,
                    email: localStorage.getItem("Email"),
                    ticketId: this.state.ticketId,
                }
            });
        window.location.reload();
    }

    SendEmail(id, price, ticketNumber) {
        axios.post("http://localhost:8000/user/SendEmail", { TicketNumber: ticketNumber, Price: price, flightID: id, email: localStorage.getItem("Email") });
    }
    onChangeAvailE(e) {
        this.setState({
            AvailE: e.target.value
        })
    }
    onChangeAvailB(e) {
        this.setState({
            AvailB: e.target.value
        })
    }
    onChangeAvailF(e) {
        this.setState({
            AvailF: e.target.value
        })
    }

    searchFlightDetails() {

        
        const f = {
            FlightNumber: '',
            toAir: '',
            fromAir: '',
            dateFlight: '',
            arrTime: this.state.arrTime,
            depTime: this.state.depTime,
            AvailE: this.state.AvailE,
            AvailB: this.state.AvailB,
            AvailF: this.state.AvailF,
            PriceFrom: '',
            PriceTo: '',



        }
        axios.post('http://localhost:8000/Flight/FindFlight', f)
        .then(res => {
            this.setState({ flightResult: res.data })
            console.log(this.state.flightResult)
        })
        
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
                                    <Nav.Link href="/user/reserve"><i className="fa fa-clipboard fa-lg"></i> My Flights</Nav.Link>

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
                                    <th>Ticket Number</th>
                                    <th>Flight Number</th>
                                    <th>Departure</th>
                                    <th>Arrival</th>
                                    <th>DepartureTime</th>
                                    <th>ArrivalTime</th>
                                    <th>Business Seats</th>
                                    <th>Economy Seats</th>
                                    <th>First Seats</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.flightsList()}
                            </tbody>


                        </Table>
                    </div>

                    <div >
                        {/* <Edit   showEdit = {this.state.showEdit} handleModalEdit = {this.state.handleModalEdit}> </Edit> */}
                        <Modal   size="xl" show={this.state.showEdit}>
                            <Modal.Header>
                                <b className="text-center">Edit Ticket Number {this.state.ticketNum}</b>


                                <Button onClick={() => { this.handleModalEdit(this.state.modalFlightNumber) }} style={{ backgroundColor: "black", borderColor: "black" }}><CancelPresentationIcon style={{ color: 'white' }}></CancelPresentationIcon></Button>

                            </Modal.Header>


                            <Modal.Body >
                            </Modal.Body>
                            <form className="CancelFlight" >

                                <div style={{ marginLeft: "8%" }}>
                                    <label  >Arrival time</label>
                                    &nbsp;&nbsp;

                                    <input style={{ width: "70%" }} type="datetime-local" id="aligned-Arr" name="arr" />
                                    &nbsp;&nbsp;
                                </div>
                                <br/>

                                <div style={{ marginLeft: "8%" }}>
                                    <label  >Departure time</label>
                                    &nbsp;&nbsp;

                                    <input style={{ width: "70%" }} type="datetime-local" id="aligned-Arr" name="arr" />
                                    &nbsp;&nbsp;
                                </div>
                                <br/>

                                <div style={{marginLeft:"8%"}} className="form-group row">



                                    <div className="col-6 col-md-3">
                                        <label htmlFor="aligned-Dep" >Number of available seats </label>
                                        &nbsp;&nbsp;
                                    </div>

                                    <div className="col-12 col-md-2">
                                        <input type="number" min='0' id="aligned-ID" placeholder="Economy" name="id2" className="form-control" value={this.state.AvailE} onChange={this.onChangeAvailE} />
                                        &nbsp;&nbsp;
                                    </div>
                                    <div className="col-12 col-md-2">
                                        <input type="number" min='0' id="aligned-ID" placeholder="Business" name="id2" className="form-control" value={this.state.AvailB} onChange={this.onChangeAvailB} />
                                        &nbsp;&nbsp;
                                    </div>
                                    <div className="col-12 col-md-2">
                                        <input type="number" min='0' id="aligned-ID" placeholder="First" name="id2" className="form-control" value={this.state.AvailF} onChange={this.onChangeAvailF} />
                                        &nbsp;&nbsp;
                                    </div>
                                </div>



                                <button type="button" className="offset-md-4   col-md-4 btn btn-dark" onClick={(props) => {this.searchFlightDetails()}}>Search</button>
                            </form>
                            <br />


                        </Modal>


                        <Modal show={this.state.show}>
                            <Modal.Header>
                                <b className="text-center">Confirm</b>
                                <Button onClick={() => { this.handleModal(this.state.modalFlightNumber) }} style={{ backgroundColor: "black", borderColor: "black" }}><CancelPresentationIcon style={{ color: 'white' }}></CancelPresentationIcon></Button>

                            </Modal.Header>


                            <Modal.Body >
                                Are You Sure You want To Cancel Your Reservation?
                            </Modal.Body>
                            <form className="CancelFlight" >
                                <button type="button" className="offset-md-4   col-md-4 btn btn-dark" onClick={(props) => {
                                    this.DeleteTicket();
                                    this.SendEmail(this.state.modalFlightNumber, this.state.totalPrice, this.state.ticketNum);

                                    alert("Reservation Cancelled Successfully");
                                    this.setState({
                                        show: false,
                                    })
                                }}>Yes</button>
                            </form>
                            <br />


                        </Modal>
                    </div>

                </div>
            </div>





        )
    }
}

export default Reserve;