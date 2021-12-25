import '../Flight.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import React from 'react';
import { IconButton, Paper } from '@mui/material';
import { styled, } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import List from '@mui/material/List';

import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';



import { Component, useState } from 'react';
import { Navbar, Nav, Container, Table, Button, Modal } from 'react-bootstrap';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Grid from '@mui/material/Grid';

import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import ListSubheader from '@mui/material/ListSubheader';

import ListItemButton from '@mui/material/ListItemButton';


import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import StripeCheckout from 'react-stripe-checkout';
import CLOUDS from 'vanta/dist/vanta.clouds.min'

import * as THREE from 'three'

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));
//import AddBoxIcon from '@mui/icons-material/AddBox';

const onFinish = (token, flightNumber, amount, ticket, deleteFunc) => {
    axios.post("http://localhost:8000/user/SendEmailPay", { token: token, amount: amount, flightNumber: flightNumber, SeatsE: SeatsArrayE, SeatsB: SeatsArrayB, SeatsF: SeatsArrayF }, {
        headers: {
            "x-auth-token": localStorage.getItem("token")
        }
    }).then(res => {
        if (res.data == "Token is not valid") {
            alert("Token expired log in again please");
            window.location = "/logIn"
        }
    });

    deleteFunc(ticket._id, ticket.FlightNumber)
    Book();
}



const Book = () => (
    axios.post('http://localhost:8000/ticket/book', request, {
        headers: {
            "x-auth-token": localStorage.getItem("token")
        }
    })
        .then((response) => {
            if (response.data == "Token is not valid") {
                alert("Token expired log in again please");
                window.location = "/logIn"
            } else {

                alert("Flight Booked Successfuly" + " Seats Economy : " + SeatsArrayE + " Seats Business : " + SeatsArrayB + " Seats First : " + SeatsArrayF);
                // else alert("blabizo");
            }

        }, (error) => {
            alert("Error Happened ")
        })
)

var flightNumber = 0;
var amountDiff = 0

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function SetColor(index, AvailE, size, Class) {
    if (index >= (size - AvailE))
        return <Item style={{ backgroundColor: "green", color: "white" }}>{Class}{index + 1}</Item>;
    else
        return <Item style={{ backgroundColor: "grey", color: "white" }}>{Class}{index + 1}</Item>;
}


var GridArray = (props) => (
    props.Seats.map(function (element, index, array) {
        return <Grid item xs={1.5}>
            {SetColor(index, element, props.Seats.length, props.Class)}
        </Grid>
    })
)


const SendEmailDetails = (id, price, ticketNumber, SeatsArrayE, SeatsArrayB, SeatsArrayF) => (
    axios.post("http://localhost:8000/user/SendEmailDetails", { TicketNumber: ticketNumber, Price: price, flightNumber: id, email: localStorage.getItem("Email"), SeatsE: SeatsArrayE, SeatsB: SeatsArrayB, SeatsF: SeatsArrayF }, {
        headers: {
            "x-auth-token": localStorage.getItem("token")
        }
    }).then(res => {
        if (res.data == "Token is not valid") {
            alert("Token expired log in again please");
            window.location = "/logIn"
        }
    })
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

var SeatsArrayE = [];
var SeatsArrayB = [];
var SeatsArrayF = [];

const Payment = (props) => (


    <Modal show={props.showPay}>
        <Modal.Header>



            <b className="text-center">Reciept</b>
            <Button onClick={() => { props.handleModalPay(props.FlightNumber) }} style={{ backgroundColor: "black" }}><CancelPresentationIcon style={{ color: 'white' }}></CancelPresentationIcon></Button>



        </Modal.Header>
        <Modal.Body>

            {(props.amount > 0) ? <h6> Amount To Pay: {props.amount}$</h6> : <h6>Amount to be refunded: {Math.abs(props.amount)}$</h6>}


            <br />
            <h6> Reserved Seats</h6>



            {SeatsArrayE.map(seat => {
                return <><h7>Seat: {seat} in Economy Class</h7><br /></>
            }
            )}

            <br />
            {SeatsArrayB.map(seat => {
                return <><h7>Seat: {seat} in Business Class</h7><br /></>
            }
            )}

            <br />
            {SeatsArrayF.map(seat => {
                return <><h7>Seat: {seat} in First Class</h7><br /></>
            }
            )}
            <br />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <StripeCheckout
                    amount={props.amount * 100}
                    panelLabel={props.amount > 0 ? ("Give Money") : ("Take Money")}
                    image="https://dvh1deh6tagwk.cloudfront.net/finder-au/wp-uploads/2016/05/Airplane.Square.jpg"
                    currency="USD"
                    name="Dash Flights"
                    token={(token) => onFinish(token, props.FlightNumber, props.amount, props.ticket, props.DeleteFunc)}
                    stripeKey="pk_test_51K8riMCMGq5st9AY99SVdeJHjz4jGecBhK7VXnQd7MMRTxtObR6INME7mP9G0c17uIS4RFovG517MYMHN2apCC3n008c7qWirP"
                />
            </div>
        </Modal.Body>

    </Modal>

)


const Flight = (props) => (

    <Card sx={{  maxWidth: 500 }}>
         
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h7">
          <img style={{float:"right"}} width={150} height={150} src='https://www.traveller.com.au/content/dam/images/h/0/y/j/f/i/image.related.socialLead.620x349.h0yjip.png/1533186854579.jpg'></img> 
                    Ticket Number: {props.ticket.TicketNumber}
                </Typography>
                <Typography  variant="subtitle1" color="text.secondary" component="div">
                    Flight Number: {props.ticket.FlightNumber}<br />
                    From: {props.ticket.Departure}  &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; To: {props.ticket.Arrival}           <br />
                    Departure: {props.ticket.DepartureTime}<br />
                    Arrival: {props.ticket.ArrivalTime}<br />
                    {(JSON.parse(props.ticket.ReservedSeatsB).length != 0) ? <><label> Business Seats: [  {(JSON.parse(props.ticket.ReservedSeatsB).map(Seat => { return (Seat + " ") }))}] </label><br/></> : <></>}
                    {(JSON.parse(props.ticket.ReservedSeatsE).length != 0) ? <><label>  Economy Seats: [  {(JSON.parse(props.ticket.ReservedSeatsE).map(Seat => { return (Seat + " ") }))}] </label><br/></> : <></>}
                    {(JSON.parse(props.ticket.ReservedSeatsF).length != 0) ? <label>  First Seats: [  {(JSON.parse(props.ticket.ReservedSeatsF).map(Seat => { return (Seat + " ") }))}]   </label> : <></>}<br/>
                    Price: {props.ticket.Price}<br />
                </Typography>
                <IconButton style={{ fontSize: 20, color: "black" }} onClick={() => { props.handleModal(props.ticket.FlightNumber, props.ticket._id, props.ticket.Price, props.ticket.TicketNumber); flightNumber = props.ticket.FlightNumber; }}><HighlightOffIcon></HighlightOffIcon>Cancel </IconButton>

         <IconButton style={{ color: "black", fontSize: 18 }} onClick={() => { SendEmailDetails(props.ticket.FlightNumber, props.ticket.Price, props.ticket.TicketNumber, props.ticket.ReservedSeatsE, props.ticket.ReservedSeatsB, props.ticket.ReservedSeatsF) }}><EmailIcon style={{ color: "black" }}></EmailIcon>Email Details &nbsp;</IconButton>
             <IconButton onClick={() => { props.handleModalEdit(props.ticket.FlightNumber, props.ticket._id, props.ticket.Price, props.ticket.TicketNumber, props.ticket); }} style={{ color: "black", fontSize: 18 }} ><EditIcon></EditIcon> &nbsp; Edit</IconButton>
            </CardContent>
         </Box>

         {/* <Box style={{ }}>
        
        <CardMedia
            component="img"
            sx={{   width: 150, height: 150 }}
            image="https://www.traveller.com.au/content/dam/images/h/0/y/j/f/i/image.related.socialLead.620x349.h0yjip.png/1533186854579.jpg"
            alt="Live from space album cover"
        />
        </Box>  */}
       
    </Card>
    // <tr >
    //     <td>{props.ticket.TicketNumber}</td>
    //     <td>{props.ticket.FlightNumber}</td>
    //     <td>{props.ticket.Departure}</td>
    //     <td>{props.ticket.Arrival}</td>
    //     <td>{props.ticket.DepartureTime}</td>
    //     <td>{props.ticket.ArrivalTime}</td>

    //     {(JSON.parse(props.ticket.ReservedSeatsB).length != 0) ? <td>{props.ticket.BusinessSeatAdult + props.ticket.BusinessSeatChild}  [ {(JSON.parse(props.ticket.ReservedSeatsB).map(Seat => { return (Seat + " ") }))}]</td> : <td>-</td>}
    //     {(JSON.parse(props.ticket.ReservedSeatsE).length != 0) ? <td>{props.ticket.EconomySeatsAdult + props.ticket.EconomySeatsChild}  [ {(JSON.parse(props.ticket.ReservedSeatsE).map(Seat => { return (Seat + " ") }))}]</td> : <td>-</td>}
    //     {(JSON.parse(props.ticket.ReservedSeatsF).length != 0) ? <td>{props.ticket.FirstSeatAdult + props.ticket.FirstSeatChild}  [ {(JSON.parse(props.ticket.ReservedSeatsF).map(Seat => { return (Seat + " ") }))}]</td> : <td>-</td>}
    //     <td>{props.ticket.Price}</td>

    //     {/* <td>{props.flight.FlightNumber}</td>
    //     <td>{props.flight.toAir}</td>
    //     <td>{props.flight.fromAir}</td>
    //     <td>{props.flight.noEconomySeats}</td>
    //     <td>{props.flight.noBusinessSeats}</td>
    //     <td>{props.flight.noFirstSeats}</td>
    //     <td>{props.flight.depTime}</td>
    //     <td>{props.flight.arrTime}</td>
    //     <td>{props.flight.arrTime}</td> */}


    //     <td>
    //         <IconButton style={{ fontSize: 20, color: "white" }} onClick={() => { props.handleModal(props.ticket.FlightNumber, props.ticket._id, props.ticket.Price, props.ticket.TicketNumber); flightNumber = props.ticket.FlightNumber; }}><HighlightOffIcon></HighlightOffIcon>Cancel </IconButton>

    //         <IconButton style={{ color: "white", fontSize: 18 }} onClick={() => { SendEmailDetails(props.ticket.FlightNumber, props.ticket.Price, props.ticket.TicketNumber, props.ticket.ReservedSeatsE, props.ticket.ReservedSeatsB, props.ticket.ReservedSeatsF) }}><EmailIcon style={{ color: "white" }}></EmailIcon>Email Details &nbsp;</IconButton>
    //         <IconButton onClick={() => { props.handleModalEdit(props.ticket.FlightNumber, props.ticket._id, props.ticket.Price, props.ticket.TicketNumber, props.ticket); }} style={{ color: "white", fontSize: 18 }} ><EditIcon></EditIcon> &nbsp;</IconButton>
    //     </td>

    // </tr>

)


var request;
var flightsDetails = []
const MM = (props) => (



    <Modal show={props.show}>
        <Modal.Header>

            <b className="text-center">Booking Flight Number : {props.FlightNumber}</b>
            <Button onClick={() => { props.handleModal(props.FlightNumber, props.index) }} style={{ backgroundColor: "black" }}><CancelPresentationIcon style={{ color: 'white' }}></CancelPresentationIcon></Button>

        </Modal.Header>
        <Modal.Body>
            <form onSubmit={props.submitModal}>
                <strong>Number of economy seats</strong>
                <div className="form-group row">
                    <label className="col-4 col-md-2 col-form-label">Adult:</label>
                    <div className="col-8 col-md-4">
                        <input type="number" className="form-control " required="true" value={props.Seats.AdultE} onChange={props.func.onChangeAdultE} />
                    </div>
                    <label className="col-4 col-md-2 col-form-label">Child:</label>
                    <div className="col-8 col-md-4">
                        <input type="number" className="form-control " required="true" value={props.Seats.ChildE} onChange={props.func.onChangeChildE} />
                    </div>

                    <br />
                    <div>
                        <Grid container spacing={2}>
                            <GridArray Class="E" SeatName="Test" Seats={new Array(props.Seats.noEconomySeats).fill(props.Seats.AvailE)}>
                            </GridArray>
                        </Grid>
                    </div>

                </div>
                <br />
                <strong>Number of business class seats</strong>
                <div className="form-group row">
                    <label className="col-4 col-md-2 col-form-label">Adult:</label>
                    <div className="col-8 col-md-4">
                        <input type="number" className="form-control " required="true" value={props.Seats.AdultB} onChange={props.func.onChangeAdultB} />
                    </div>
                    <label className="col-4 col-md-2 col-form-label">Child:</label>
                    <div className="col-8 col-md-4">
                        <input type="number" className="form-control " required="true" value={props.Seats.ChildB} onChange={props.func.onChangeChildB} />
                    </div>

                    <br />
                    <div>
                        <Grid container spacing={2}>
                            <GridArray Class="B" SeatName="Test" Seats={new Array(props.Seats.noBusinessSeats).fill(props.Seats.AvailB)}>
                            </GridArray>
                        </Grid>
                    </div>


                </div>
                <br />
                <div className="form-group row">
                    <strong>Number of first class seats</strong>
                    <label className="col-4 col-md-2 col-form-label">Adult:</label>
                    <div className="col-8 col-md-4">
                        <input type="number" className="form-control " required="true" value={props.Seats.AdultF} onChange={props.func.onChangeAdultF} />
                    </div>
                    <label className="col-4 col-md-2 col-form-label">Child:</label>
                    <div className="col-8 col-md-4">
                        <input type="number" className="form-control " required="true" value={props.Seats.ChildF} onChange={props.func.onChangeChildF} />
                    </div>

                    <Grid container spacing={2}>
                        <GridArray Class="F" SeatName="Test" Seats={new Array(props.Seats.noFirstSeats).fill(props.Seats.AvailF)}>
                        </GridArray>
                    </Grid>
                </div>
                <br />
                <div className="form-group row ">


                    <button className="offset-md-4   col-md-4 btn btn-dark">Book</button>

                </div>

            </form>
        </Modal.Body>

    </Modal>

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
        this.handleModalBook = this.handleModalBook.bind(this);
        this.handleModalPay = this.handleModalPay.bind(this);
        this.DeleteTicketAlreadyReserved = this.DeleteTicketAlreadyReserved.bind(this);

        this.onChangeAdultE = this.onChangeAdultE.bind(this);
        this.onChangeAdultB = this.onChangeAdultB.bind(this);
        this.onChangeAdultF = this.onChangeAdultF.bind(this);
        this.onChangeChildE = this.onChangeChildE.bind(this);
        this.onChangeChildF = this.onChangeChildF.bind(this);
        this.onChangeChildB = this.onChangeChildB.bind(this);

        this.state = {
            tickets: [],
            show: false,
            showEdit: false,
            modalFlightNumber: '',
            flights: [],
            flightResult: [],
            ticketId: "",
            dense: false,
            secondary: false,
            totalPrice: 0,
            TicketNumber: 0,
            currTicket: "",
            AvailE: '',
            AvailB: '',
            AvailF: '',
            arrTime: '',
            toDeleteTicket: '',
            depTime: '',
            amount: 0,
            amountToPay: 0,
            open: [],

            AvailE: 0,
            AvailB: 0,
            AvailF: 0,

            AdultE: 0,
            AdultB: 0,
            AdultF: 0,
            ChildE: 0,
            ChildB: 0,
            ChildF: 0,

            noEconomySeats: 0,
            noBusinessSeats: 0,
            noFirstSeats: 0,

            showBook: [],
            showPay: false,
        };

    }



    handleModalPay(id) {
        this.setState({
            showPay: !this.state.showPay,
            modalFlightNumber: id,
        })
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


    submitModal(e, ticket, flightNumber) {
        // if(this.state.modalFlightNumber==100) window.location='/user/home'
        e.preventDefault();
        this.setState({ toDeleteTicket: ticket })
        request = {
            Email: localStorage.getItem("Email"),
            FlightNumber: flightNumber,
            AdultE: this.state.AdultE,
            AdultB: this.state.AdultB,
            AdultF: this.state.AdultF,

            ChildE: this.state.ChildE,
            ChildB: this.state.ChildB,
            ChildF: this.state.ChildF,

            noEconomySeats: this.state.noEconomySeats,
            noBusinessSeats: this.state.noBusinessSeats,
            noFirstSeats: this.state.noFirstSeats,

            AvailE: this.state.AvailE,
            AvailF: this.state.AvailF,
            AvailB: this.state.AvailB,

            totalPrice: 0,
            Departure: '',
            Arrival: '',
            DepartureTime: '',
            ArrivalTime: '',

            SeatsE: '',
            SeatsB: '',
            SeatsF: '',

            ReservedSeats: '',
        }

        const x = {
            FlightNumber: flightNumber,
        }


        axios.post('http://localhost:8000/Flight/av', x, {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        })
            .then(res => {
                if (res.data == "Token is not valid") {
                    alert("Token expired log in again please");
                    window.location = "/logIn"
                } else {

                    const ae = Number(res.data.AE) - (Number(request.AdultE) + Number(request.ChildE));
                    const ab = Number(res.data.AB) - (Number(request.AdultB) + Number(request.ChildB));
                    const af = Number(res.data.AF) - (Number(request.AdultF) + Number(request.ChildF));
                    const pe = (Number(res.data.priceE) * Number(request.AdultE)) + (Number(res.data.priceE) * Number(request.ChildE) * 0.5);
                    const pf = (Number(res.data.priceF) * Number(request.AdultF)) + (Number(res.data.priceF) * Number(request.ChildF) * 0.5);
                    const pb = (Number(res.data.priceB) * Number(request.AdultB)) + (Number(res.data.priceB) * Number(request.ChildB) * 0.5);

                    const total = pe + pb + pf;
                    request.totalPrice = total;


                    this.setState({ amount: (total - ticket.Price) });
                    request.Departure = res.data.Departure;
                    request.Arrival = res.data.Arrival;
                    request.DepartureTime = res.data.DepartureTime;
                    request.ArrivalTime = res.data.ArrivalTime;

                    request.AvailE = res.data.AE;
                    request.AvailB = res.data.AB;
                    request.AvailF = res.data.AF;

                    request.noEconomySeats = res.data.noEconomySeats;
                    request.noBusinessSeats = res.data.noBusinessSeats;
                    request.noFirstSeats = res.data.noFirstSeats;



                    if (total == 0) {
                        this.setState({ showPay: false })
                        alert("You have to Book at least 1 Seat!");
                        return;
                    }



                    if (ae > -1 && ab > -1 && af > -1) {

                        var passengersE = (Number(request.AdultE) + Number(request.ChildE));
                        var passengersB = (Number(request.AdultB) + Number(request.ChildB));
                        var passengersF = (Number(request.AdultF) + Number(request.ChildF));

                        var beginE = Number(request.noEconomySeats) - Number(request.AvailE);
                        var beginB = Number(request.noBusinessSeats) - Number(request.AvailB);
                        var beginF = Number(request.noFirstSeats) - Number(request.AvailF);

                        var arrE = [];
                        var arrF = [];
                        var arrB = [];




                        for (let i = beginE + 1; i <= beginE + passengersE; i++)
                            arrE.push("E" + i);

                        for (let i = beginB + 1; i <= beginB + passengersB; i++)
                            arrB.push("B" + i);

                        for (let i = beginF + 1; i <= beginF + passengersF; i++)
                            arrF.push("F" + i);

                        request.SeatsE = arrE;
                        request.SeatsB = arrB;
                        request.SeatsF = arrF;




                        SeatsArrayE = arrE;
                        SeatsArrayB = arrB;
                        SeatsArrayF = arrF;

                        request.ReservedSeatsE = JSON.stringify(SeatsArrayE);
                        request.ReservedSeatsB = JSON.stringify(SeatsArrayB);
                        request.ReservedSeatsF = JSON.stringify(SeatsArrayF);


                        this.setState({ showPay: true })

                    } else {
                        this.setState({ showPay: false })
                        alert('No enough seats for your request');
                    }
                }
            }).catch(err => {
                alert(err);
            });
        this.setState({
            modalFlightNumber: '',
            show: false,
        })

    }


    handleModalBook(id, index) {
        flightsDetails[index] = !flightsDetails[index]
        this.setState({
            showBook: !this.state.showBook,
            modalFlightNumber: id,
        })
    }


    onChangeAdultE(e) {
        this.setState({
            AdultE: e.target.value
        })
    }
    onChangeAdultB(e) {
        this.setState({
            AdultB: e.target.value
        })
    }
    onChangeAdultF(e) {
        this.setState({
            AdultF: e.target.value
        })
    }
    onChangeChildE(e) {
        this.setState({
            ChildE: e.target.value
        })
    }
    onChangeChildB(e) {
        this.setState({
            ChildB: e.target.value
        })
    }
    onChangeChildF(e) {
        this.setState({
            ChildF: e.target.value
        })
    }


    handleModalEdit(id, ticketIdd, price, ticketNumber, currentTicket) {
        this.setState({
            flightResult: [],
            AvailE: '',
            AvailB: '',
            AvailF: '',
            currTicket: currentTicket,
            showEdit: !this.state.showEdit,
            modalFlightNumber: id,
            ticketId: ticketIdd,
            totalPrice: price,
            ticketNum: ticketNumber
        })
    }
    

    componentDidMount() {
       
        axios.post('http://localhost:8000/Flight/getAllTickets', { Email: localStorage.getItem('Email') }, {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        })
            .then((res) => {
                if (res.data == "Token is not valid") {
                    alert("Token expired log in again please");
                    window.location = "/logIn"
                } else {

                    this.setState({ tickets: res.data });
                }
            })
            .catch((err) => {
                console.log(err);

            })

        axios.get('http://localhost:8000/Flight/getAllFlights', {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        })
            .then((res) => {
                if (res.data == "Token is not valid") {
                    alert("Token expired log in again please");
                    window.location = "/logIn"
                } else {

                    this.setState({ flights: res.data });
                }
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

    DeleteTicketAlreadyReserved(ticketID, flightNum) {
        axios.delete(`http://localhost:8000/delete/`,
            {
                data:
                {
                    flightNumber: flightNum,
                    email: localStorage.getItem("Email"),
                    ticketId: ticketID,
                }
            }, {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        }).then(res => {
            if (res.data == "Token is not valid") {
                alert("Token expired log in again please");
                window.location = "/logIn"
            }
        });

        window.location.reload();
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
            }, {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        }).then(res => {
            if (res.data == "Token is not valid") {
                alert("Token expired log in again please");
                window.location = "/logIn"
            }
        });
        window.location.reload();
    }

    SendEmail(id, price, ticketNumber) {
        axios.post("http://localhost:8000/user/SendEmail", { TicketNumber: ticketNumber, Price: price, flightID: id, email: localStorage.getItem("Email") }, {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        }).then(res => {
            if (res.data == "Token is not valid") {
                alert("Token expired log in again please");
                window.location = "/logIn"
            }
        });
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
        axios.post('http://localhost:8000/Flight/FindFlight', f, {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        })
            .then(res => {
                if (res.data == "Token is not valid") {
                    alert("Token expired log in again please");
                    window.location = "/logIn"
                } else {

                    for (let i = 0; i < res.data.length; i++)
                        res.data[i].open = false
                    this.setState({ flightResult: res.data })

                }
            })

    }


    calculatePrice(ticket, flightNum) {
        var AdultE = ticket.EconomySeatsAdult
        var ChildE = ticket.EconomySeatsChild
        var AdultB = ticket.BusinessSeatAdult
        var ChildB = ticket.BusinessSeatChild
        var AdultF = ticket.FirstSeatAdult
        var ChildF = ticket.FirstSeatChild


        const x = {
            FlightNumber: flightNum,
        }

        axios.post('http://localhost:8000/Flight/av', x, {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        })
            .then(res => {
                if (res.data == "Token is not valid") {
                    alert("Token expired log in again please");
                    window.location = "/logIn"
                } else {


                    // const ae = Number(res.data.AE) - (Number(request.AdultE) + Number(request.ChildE));
                    // const ab = Number(res.data.AB) - (Number(request.AdultB) + Number(request.ChildB));
                    // const af = Number(res.data.AF) - (Number(request.AdultF) + Number(request.ChildF));
                    const pe = (Number(res.data.priceE) * Number(AdultE)) + (Number(res.data.priceE) * Number(ChildE) * 0.5);
                    const pb = (Number(res.data.priceB) * Number(AdultB)) + (Number(res.data.priceB) * Number(ChildB) * 0.5);
                    const pf = (Number(res.data.priceF) * Number(AdultF)) + (Number(res.data.priceF) * Number(ChildF) * 0.5);

                    const total = Number(pe + pb + pf);
                    alert(total)

                    this.setState({ amount: total - ticket.price });

                    return (total - ticket.Price)
                }
            })
    }

    handleClick = (value) => {
        value.open = !value.open
    };

    generate(ticket) {

        return this.state.flightResult.map((value, index) =>
            React.cloneElement(<><IconButton onClick={(props) => (this.handleModalBook(value.FlightNumber, index))}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AirplaneTicketIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={"Flight Number:" + value.FlightNumber}
                    // secondary={"Departure Time:"+ value.depTime + " -----------Arrival Time:" + value.arrTime    }
                    />
                    <br />
                    <ListItemText style={{ marginLeft: "20px" }}
                        // primary= {"Departure Time:"+ value.depTime  }
                        secondary={"Departure Time:" + value.depTime}

                    />
                    <ListItemText style={{ marginLeft: "20px" }}
                        // primary= {"Departure Time:"+ value.depTime  }
                        secondary={"Arrival Time:" + value.arrTime}
                    />





                </ListItem>

            </IconButton>

                <MM index={index} counter={this.state.counter} onCounter={this.onCounter} FlightNumber={value.FlightNumber} handleModal={this.handleModalBook} Seats={{
                    AdultE: this.state.AdultE,
                    AdultB: this.state.AdultB,
                    AdultF: this.state.AdultF,
                    ChildE: this.state.ChildE,
                    ChildB: this.state.ChildB,
                    ChildF: this.state.ChildF,

                    AvailE: value.AvailE,
                    AvailB: value.AvailB,
                    AvailF: value.AvailF,

                    noEconomySeats: value.noEconomySeats,
                    noBusinessSeats: value.noBusinessSeats,
                    noFirstSeats: value.noFirstSeats,

                }} show={flightsDetails[index]} func={{
                    onChangeAdultE: this.onChangeAdultE,
                    onChangeAdultB: this.onChangeAdultB,
                    onChangeAdultF: this.onChangeAdultF,
                    onChangeChildE: this.onChangeChildE,
                    onChangeChildB: this.onChangeChildB,
                    onChangeChildF: this.onChangeChildF,

                }}
                    submitModal={(e) => this.submitModal(e, ticket, value.FlightNumber)}
                    handleModalPay={this.handleModalPay}

                />

                <br /></>
                , {
                    key: value,
                }),
        );
    }

    render() {
        return (

            <body >
               
              
             
            <div   className="container-fluid">
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

                <div className="col-12 text-center">
                            <br />
                            <h2 >My Tickets</h2>
                        </div>


                <br />

                <div >

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }} >
                         
                        {this.flightsList()}
                    </div>

                    <div >
                        {/* <Edit   showEdit = {this.state.showEdit} handleModalEdit = {this.state.handleModalEdit}> </Edit> */}
                        <Modal size="xl" show={this.state.showEdit}>
                            <Modal.Header>
                                <b className="text-center">Edit Ticket Number {this.state.ticketNum}</b>


                                <Button onClick={() => { this.handleModalEdit(this.state.modalFlightNumber) }} style={{ backgroundColor: "black", borderColor: "black" }}><CancelPresentationIcon style={{ color: 'white' }}></CancelPresentationIcon></Button>

                            </Modal.Header>


                            <Modal.Body >
                            </Modal.Body>
                            <form className="CancelFlight" >

                                <div style={{ marginLeft: "9%" }}>
                                    <label  >Arrival time</label>
                                    &nbsp;&nbsp;

                                    <input style={{ width: "70%", marginLeft: "2.5%" }} type="datetime-local" id="aligned-Arr" name="arr" />
                                    &nbsp;&nbsp;
                                </div>
                                <br />

                                <div style={{ marginLeft: "9%" }}>
                                    <label  >Departure time</label>
                                    &nbsp;&nbsp;

                                    <input style={{ width: "70%" }} type="datetime-local" id="aligned-Arr" name="arr" />
                                    &nbsp;&nbsp;
                                </div>
                                <br />

                                <div style={{ marginLeft: "8%" }} className="form-group row">



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



                                <button type="button" className="offset-md-4   col-md-4 btn btn-dark" onClick={(props) => { this.searchFlightDetails() }}>Search</button>

                                <Grid item xs={12} md={12}>
                                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                                        Flights
                                    </Typography>
                                    <Demo>
                                        <List desnse={this.state.dense}>
                                            {this.generate(this.state.currTicket)}
                                        </List>
                                    </Demo>
                                </Grid>

                            </form>
                            <br />


                        </Modal>

                        <Payment showPay={this.state.showPay}
                            submitModal={this.submitModal}
                            handleModalPay={this.handleModalPay}
                            handleModal={this.handleModal}
                            amount={this.state.amount}
                            DeleteFunc={this.DeleteTicketAlreadyReserved}
                            ticket={this.state.toDeleteTicket}
                        />

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
            
            </body>





        )
    }
}

export default Reserve;