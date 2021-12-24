import '../Flight.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import React from 'react';
import { IconButton, Collapse, Grid, Paper, styled } from '@mui/material';
import { Component, MyComponent } from 'react';
import { Navbar, Nav, Container, Table, Button, Modal } from 'react-bootstrap';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import InfoIcon from '@mui/icons-material/Info';

import StripeCheckout from 'react-stripe-checkout';

const parse = require('html-react-parser');

//import AddBoxIcon from '@mui/icons-material/AddBox';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

var SeatsArrayE = [];
var SeatsArrayB = [];
var SeatsArrayF = [];

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


const MM = (props) => (



    <Modal show={props.show}>
        <Modal.Header>

            <b className="text-center">Booking Flight Number : {props.FlightNumber}</b>
            <Button onClick={() => { props.handleModal(props.FlightNumber) }} style={{ backgroundColor: "black" }}><CancelPresentationIcon style={{ color: 'white' }}></CancelPresentationIcon></Button>

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

var SeatsArrayE = [];
var SeatsArrayB = [];
var SeatsArrayF = [];
var request;

const onFinish = (token, flightNumber, amount) => {
    axios.post("http://localhost:8000/user/SendEmailPay", { token: token, amount: amount, flightNumber: flightNumber, SeatsE: SeatsArrayE, SeatsB: SeatsArrayB, SeatsF: SeatsArrayF },
        {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        }
    );
    Book();
}


const Book = () => (
    axios.post('http://localhost:8000/ticket/book', request,
        {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        }
    )
        .then((res) => {
            if (res.data == "Token is not valid") {
                alert("Token Expired LogIn Again");
                window.location = "/logIn";
            } else {

                alert("Flight Booked Successfuly" + " Seats Economy : " + SeatsArrayE + " Seats Business : " + SeatsArrayB + " Seats First : " + SeatsArrayF);
                // else alert("blabizo");

            }
        }, (error) => {
            alert("Error Happened ")
        })
)

const Payment = (props) => (


    <Modal show={props.showPay}>
        <Modal.Header>



            <b className="text-center">Reciept</b>
            <Button onClick={() => { props.handleModalPay(props.FlightNumber) }} style={{ backgroundColor: "black" }}><CancelPresentationIcon style={{ color: 'white' }}></CancelPresentationIcon></Button>



        </Modal.Header>
        <Modal.Body>

            <h6> Amount To Pay: {props.amount}$</h6>


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
                    image="https://dvh1deh6tagwk.cloudfront.net/finder-au/wp-uploads/2016/05/Airplane.Square.jpg"
                    currency="USD"
                    name="Dash Flights"
                    token={(token) => onFinish(token, props.FlightNumber, props.amount)}
                    stripeKey="pk_test_51K8riMCMGq5st9AY99SVdeJHjz4jGecBhK7VXnQd7MMRTxtObR6INME7mP9G0c17uIS4RFovG517MYMHN2apCC3n008c7qWirP"
                />
            </div>
        </Modal.Body>

    </Modal>

)


const Flight = (props) => (

    <tr >
        <td>{props.flight.FlightNumber}</td>
        <td>{props.flight.toAir}</td>
        <td>{props.flight.fromAir}</td>
        <td>{props.flight.depTime}</td>
        <td>{props.flight.arrTime}</td>


        <td style={{ width: "18%" }}>
            <IconButton style={{ color: "white", fontSize: 18 }} onClick={() => { props.FlightDetails(props.flight.FlightNumber) }}>Details &nbsp; <InfoIcon style={{ color: "white" }}></InfoIcon></IconButton>
        </td>



    </tr>

)

const showFlight = (props) => (
    <tr >
        <td>{props.showFlight[0].baggageallowance}</td>


    </tr>
)

class Flights extends Component {



    constructor(props) {
        super(props);
        //const [open, setOpen] = React.useState(false);
        this.handleModal = this.handleModal.bind(this);
        this.handleModalPay = this.handleModalPay.bind(this);
        this.test2 = this.test2.bind(this);
        this.FlightDetails = this.FlightDetails.bind(this);


        this.onChangeAdultE = this.onChangeAdultE.bind(this);
        this.onChangeAdultB = this.onChangeAdultB.bind(this);
        this.onChangeAdultF = this.onChangeAdultF.bind(this);
        this.onChangeChildE = this.onChangeChildE.bind(this);
        this.onChangeChildF = this.onChangeChildF.bind(this);
        this.onChangeChildB = this.onChangeChildB.bind(this);
        this.onCounter = this.onCounter.bind(this);
        this.submitModal = this.submitModal.bind(this);
        this.submitModalPay = this.submitModal.bind(this);



        this.state = {
            flights: [],
            show: false,
            showPay: false,
            modalFlightNumber: '',
            showFlight: [],
            FlightNumber: '',
            toAir: '',
            fromAir: '',
            depTime: '',
            arrTime: '',
            NumPass: '',
            CabinClass: '',

            amount: '',

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


        }

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

    handleModal(id) {
        this.setState({
            show: !this.state.show,
            modalFlightNumber: id,
        })
    }

    handleModalPay(id) {
        this.setState({
            showPay: !this.state.showPay,
            modalFlightNumber: id,
        })
    }

    onCounter() {
        this.setState({
            counter: 0
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

    submitModalPay(e) {

    }

    submitModal(e) {
        // if(this.state.modalFlightNumber==100) window.location='/user/home'
        e.preventDefault();

        request = {
            Email: localStorage.getItem("Email"),
            FlightNumber: this.state.modalFlightNumber,
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
            FlightNumber: this.state.modalFlightNumber,
        }

        axios.post('http://localhost:8000/Flight/av', x, {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        })
            .then(res => {
                if (res.data == "Token is not valid") {
                    alert("Token Expired LogIn Again");
                    window.location = "/logIn";
                } else {

                    const ae = Number(res.data.AE) - (Number(request.AdultE) + Number(request.ChildE));
                    const ab = Number(res.data.AB) - (Number(request.AdultB) + Number(request.ChildB));
                    const af = Number(res.data.AF) - (Number(request.AdultF) + Number(request.ChildF));
                    const pe = (Number(res.data.priceE) * Number(request.AdultE)) + (Number(res.data.priceE) * Number(request.ChildE) * 0.5);
                    const pb = (Number(res.data.priceB) * Number(request.AdultB)) + (Number(res.data.priceB) * Number(request.ChildB) * 0.5);
                    const pf = (Number(res.data.priceF) * Number(request.AdultF)) + (Number(res.data.priceF) * Number(request.ChildF) * 0.5);

                    const total = pe + pb + pf;
                    request.totalPrice = total;
                    this.setState({ amount: total });
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

                    console.log("ASDFASDFASDFASDF");
                    console.log(res.data.noFirstSeats)
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


                        console.log(beginF);

                        console.log(request.AvailE);
                        console.log(request.AvailB);
                        console.log(request.AvailF);

                        for (let i = beginE + 1; i <= beginE + passengersE; i++)
                            arrE.push("E" + i);

                        for (let i = beginB + 1; i <= beginB + passengersB; i++)
                            arrB.push("B" + i);

                        for (let i = beginF + 1; i <= beginF + passengersF; i++)
                            arrF.push("F" + i);

                        request.SeatsE = arrE;
                        request.SeatsB = arrB;
                        request.SeatsF = arrF;


                        console.log(arrE);
                        console.log(arrF);
                        console.log(arrB);

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


    componentDidMount() {
        axios.get('http://localhost:8000/Flight/getAllFlights', {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        })
            .then((res) => {
                if (res.data == "Token is not valid") {
                    alert("Token Expired LogIn Again");
                    window.location = "/logIn";
                } else {
                    this.setState({ flights: res.data });
                }
                console.log(res);

            })
            .catch((err) => {
                console.log(err);

            })
    }

    flightsList() {
        return (this.state.flights.map(currentFlight => {
            return <Flight flight={currentFlight} FlightDetails={this.FlightDetails} handleModal={this.handleModal} />
        }))
    }

    FlightDetails(id) {
        var temp = { FlightNumber: id };
        axios.post('http://localhost:8000/Flight/showFlight', temp, {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        })
            .then(res => {
                if(res.data =="Token is not valid"){
                    alert("Token expired log in again please");
                }else{
                    
                    this.setState({ showFlight: res.data });
                }


            })


    }

    test2() {
        return (this.state.showFlight.map(currentFlight => {

            var time1 = Date.parse(currentFlight.arrTime);
            var time2 = Date.parse(currentFlight.depTime);

            return <div className="container-fluid">
                <div className="row row-content">
                    <form className="col-md-6 offset-md-3" style={{ padding: 30, boxShadow: "0px 5px 20px 0px rgba(0, 0, 0, 0.3)", borderRadius: 20 }}>




                        <p style={{ textAlign: 'center' }}>Flight Details Flno: :{currentFlight.FlightNumber} </p>
                        <br></br>

                        <div className="row row-content">

                            <div className="col-12 col-md-6  " style={{ textAlign: 'left' }} >
                                <p>Baggage Allowance:{currentFlight.baggageallowance} </p>
                                <p>Adults Economy:{currentFlight.priceEconomy}</p>
                                <p>Adults First:{currentFlight.priceFirst}</p>
                                <p>Adults Business:{currentFlight.pricebusiness} </p>
                            </div>
                            <div className="col-12 col-md-6 " style={{ textAlign: 'left' }}>

                                <p>children Economy:{(currentFlight.priceEconomy) / 2}</p>
                                <p>children First:{(currentFlight.priceFirst) / 2}</p>
                                <p>children Business:{(currentFlight.pricebusiness) / 2} </p>
                                <p>Trip duration:{(Math.abs((time2 - time1) / (1000 * 60 * 60)).toFixed(2)) + "hours"} </p>


                            </div>
                            <div className="row row-content"><Button className="btn-dark " style={{ width: "100%", marginLeft: 13 }} onClick={() => {
                                this.handleModal(currentFlight.FlightNumber)
                            }}>Book</Button> </div>

                        </div>

                    </form>
                </div>
                <br />
                <MM counter={this.state.counter} onCounter={this.onCounter} FlightNumber={currentFlight.FlightNumber} handleModal={this.handleModal} Seats={{
                    AdultE: this.state.AdultE,
                    AdultB: this.state.AdultB,
                    AdultF: this.state.AdultF,
                    ChildE: this.state.ChildE,
                    ChildB: this.state.ChildB,
                    ChildF: this.state.ChildF,

                    AvailE: currentFlight.AvailE,
                    AvailB: currentFlight.AvailB,
                    AvailF: currentFlight.AvailF,

                    noEconomySeats: currentFlight.noEconomySeats,
                    noBusinessSeats: currentFlight.noBusinessSeats,
                    noFirstSeats: currentFlight.noFirstSeats,

                }} show={this.state.show} func={{
                    onChangeAdultE: this.onChangeAdultE,
                    onChangeAdultB: this.onChangeAdultB,
                    onChangeAdultF: this.onChangeAdultF,
                    onChangeChildE: this.onChangeChildE,
                    onChangeChildB: this.onChangeChildB,
                    onChangeChildF: this.onChangeChildF,

                }}
                    submitModal={this.submitModal}
                    handleModalPay={this.handleModalPay}

                />

                <Payment showPay={this.state.showPay}
                    submitModal={this.submitModal}
                    handleModalPay={this.handleModalPay}
                    handleModal={this.handleModal}
                    FlightNumber={currentFlight.FlightNumber}
                    amount={this.state.amount}
                />

            </div>




        }))

    }




    pop(id) {


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
                    <div className="cl-12 ">


                        {this.test2()}


                    </div>

                    <div className="col-12 ">

                        <Table className="table table-dark d-felx " striped bordered hover size="xs">
                            <thead >
                                <tr >
                                    <th>Flight Number</th>
                                    <th>Arrival</th>
                                    <th>Departure</th>
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



                </div>
            </div>





        )
    }
}

export default Flights;