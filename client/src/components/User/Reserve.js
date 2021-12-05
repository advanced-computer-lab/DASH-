import '../Flight.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import React from 'react';
import { IconButton } from '@mui/material';
import { Component } from 'react';
import { Navbar, Nav, Container, Table, Button, Modal } from 'react-bootstrap';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import EditIcon from '@mui/icons-material/Edit';

//import AddBoxIcon from '@mui/icons-material/AddBox';

var flightNumber = 0;

const Flight = (props) => (
    <tr >
        <td>{props.ticket.FlightNumber}</td>
        <td>{props.ticket.Departure}</td>
        <td>{props.ticket.Arrival}</td>
        <td>{props.ticket.DepartureTime}</td>
        <td>{props.ticket.ArrivalTime}</td>
        <td>{props.ticket.BusinessSeatAdult}</td>
        <td>{props.ticket.EconomySeatsAdult}</td>
        <td>{props.ticket.FirstSeatAdult}</td>
        <td>{props.ticket.BusinessSeatChild}</td>
        <td>{props.ticket.EconomySeatsChild}</td>
        <td>{props.ticket.FirstSeatChild}</td>
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
            <IconButton style={{fontSize:20 , color:"white"}} onClick={() => { props.handleModal(props.ticket.FlightNumber,props.ticket._id,props.ticket.Price) ; flightNumber = props.ticket.FlightNumber; }}>Cancel Reservation</IconButton>

        </td>

    </tr>

)



class Reserve extends Component {
    constructor(props) {
        super(props);
        this.handleModal = this.handleModal.bind(this);
        this.DeleteTicket=this.DeleteTicket.bind(this);
        this.state = {
            tickets: [],
            show: false,
            modalFlightNumber: '',
            ticketId:"",
            totalPrice:0

        };
    }

    handleModal(id,ticketIdd, price) {
        this.setState({
            show: !this.state.show,
            modalFlightNumber: id,
            ticketId:ticketIdd,
            totalPrice : price
        })
    }

    componentDidMount() {
        axios.post('http://localhost:8000/Flight/getAllTickets',{Email:localStorage.getItem('Email')})
            .then((res) => {
                this.setState({ tickets: res.data });
            })
            .catch((err) => {
                console.log(err);

            })

    }

    flightsList() {
        return (this.state.tickets.map(currentTicket => {
            return <Flight ticket={currentTicket} handleModal={this.handleModal}/>
        }))
    }


    DeleteTicket()
    {
        axios.delete(`http://localhost:8000/delete/`,
        {
            data : 
            {
                flightNumber : this.state.modalFlightNumber,
                email : localStorage.getItem("Email"),
                ticketId:this.state.ticketId,
            }
        });
        window.location.reload();
    }

    SendEmail(id,price)
    {
        console.log(price);
        console.log(id);
        axios.post("http://localhost:8000/user/SendEmail",{Price: price, flightID : id, email : localStorage.getItem("Email")});
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
                                    <th>Flight Number</th>
                                    <th>Departure</th>
                                    <th>Arrival</th>
                                    <th>DepartureTime</th>
                                    <th>ArrivalTime</th>
                                    <th>Business Seat Adult</th>
                                    <th>Economy Seat Adult</th>
                                    <th>First Seat Adult</th>
                                    <th>Business Seat Child</th>
                                    <th>Economy Seat Child</th>
                                    <th>First Seat Child</th>
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
                        <Modal show={this.state.show}>
                            <Modal.Header>
                            <b className="text-center">Confirm</b>
                                <Button onClick={() => {  this.handleModal(this.state.modalFlightNumber) }} style={{ backgroundColor: "black",borderColor:"black" }}><CancelPresentationIcon style={{ color: 'white' }}></CancelPresentationIcon></Button>
                            
                            </Modal.Header>

                            <Modal.Body>
                                Are You Sure You want To Cancel Your Reservation?
                            </Modal.Body>
                            <form className="CancelFlight" >
                            <button type="button" className="offset-md-4   col-md-4 btn btn-dark" onClick={(props) => {
                                this.DeleteTicket();
                                this.SendEmail(this.state.modalFlightNumber,this.state.totalPrice);

                                alert("Reservation Cancelled Successfully");
                                 this.setState({
                                    show: false,
                                })
                            }}>Yes</button>
                            </form>
                            <br/>
                            

                        </Modal>
                    </div>

                </div>
            </div>





        )
    }
}

export default Reserve;