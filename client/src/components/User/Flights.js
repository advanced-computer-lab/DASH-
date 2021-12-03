import '../Flight.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import React from 'react';
import { IconButton } from '@mui/material';
import { Component } from 'react';
import { Navbar, Nav, Container, Table, Button, Modal } from 'react-bootstrap';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';

//import AddBoxIcon from '@mui/icons-material/AddBox';

const MM = (props) => (
    <Modal show={props.show}>
        <Modal.Header >

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
                </div>
                <br />
                <div className="form-group row ">


                    <button type="submit" className="offset-md-4   col-md-4 btn btn-dark">Book</button>

                </div>

            </form>
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


        <td>
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
        this.handleModal = this.handleModal.bind(this);
        this.test2 = this.test2.bind(this);
        this.FlightDetails = this.FlightDetails.bind(this);


        this.onChangeAdultE = this.onChangeAdultE.bind(this);
        this.onChangeAdultB = this.onChangeAdultB.bind(this);
        this.onChangeAdultF = this.onChangeAdultF.bind(this);
        this.onChangeChildE = this.onChangeChildE.bind(this);
        this.onChangeChildF = this.onChangeChildF.bind(this);
        this.onChangeChildB = this.onChangeChildB.bind(this);
        this.submitModal = this.submitModal.bind(this);



        this.state = {
            flights: [],
            show: false,
            modalFlightNumber: '',
            showFlight: [],
            FlightNumber: '',
            toAir: '',
            fromAir: '',
            depTime: '',
            arrTime: '',
            NumPass: '',
            CabinClass: '',


            AdultE: '',
            AdultB: '',
            AdultF: '',

            ChildE: '',
            ChildB: '',
            ChildF: '',


        };
    }

    handleModal(id) {
        this.setState({
            show: !this.state.show,
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


    submitModal(e) {
        // if(this.state.modalFlightNumber==100) window.location='/user/home'
        e.preventDefault();

        const request = {
            Email: localStorage.getItem("Email"),
            FlightNumber: this.state.modalFlightNumber,
            AdultE: this.state.AdultE,
            AdultB: this.state.AdultB,
            AdultF: this.state.AdultF,

            ChildE: this.state.ChildE,
            ChildB: this.state.ChildB,
            ChildF: this.state.ChildF,
            totalPrice: 0,
            Departure:'',
            Arrival:'',
            DepartureTime:'',
            ArrivalTime:''
        }
        const x = {
            FlightNumber: this.state.modalFlightNumber,
        }

        axios.post('http://localhost:8000/Flight/av', x)
            .then(res => {
                const ae = Number(res.data.AE) - (Number(request.AdultE) + Number(request.ChildE));
                const ab = Number(res.data.AB) - (Number(request.AdultB) + Number(request.ChildB));
                const af = Number(res.data.AF) - (Number(request.AdultF) + Number(request.ChildF));
                const pe = (Number(res.data.priceE) * Number(request.AdultE)) + (Number(res.data.priceE) * Number(request.ChildE) * 0.5);
                const pb = (Number(res.data.priceB) * Number(request.AdultB)) + (Number(res.data.priceB) * Number(request.ChildB) * 0.5);
                const pf = (Number(res.data.priceF) * Number(request.AdultF)) + (Number(res.data.priceF) * Number(request.ChildF) * 0.5);
                const total = pe + pb + pf;
                request.totalPrice = total;
                request.Departure=res.data.Departure;
                request.Arrival=res.data.Arrival;
                request.DepartureTime=res.data.DepartureTime;
                request.ArrivalTime=res.data.ArrivalTime;
                if (window.confirm("The total price is :" + total + "\n" + 'Are you sure you want to book this flight? ')) {
                    if (ae > -1 && ab > -1 && af > -1) {
                        console.log(request)
                        axios.post('http://localhost:8000/ticket/book', request)
                            .then((response) => {
                                if (response) alert("Flight Booked Successfuly");
                                else alert("blabizo");

                            }, (error) => {
                                alert("Error Happened ")
                            });
                    } else {
                        alert('No enough seats for your request');
                    }
                } else {

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
            return <Flight flight={currentFlight} FlightDetails={this.FlightDetails} handleModal={this.handleModal} />
        }))
    }
    FlightDetails(id) {
        var temp = { FlightNumber: id };
        axios.post('http://localhost:8000/Flight/showFlight', temp)
            .then(res => {
                this.setState({ showFlight: res.data })


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
                <MM FlightNumber={currentFlight.FlightNumber} handleModal={this.handleModal} Seats={{
                    AdultE: this.state.AdultE,
                    AdultB: this.state.AdultB,
                    AdultF: this.state.AdultF,
                    ChildE: this.state.ChildE,
                    ChildB: this.state.ChildB,
                    ChildF: this.state.ChildF,

                }} show={this.state.show} func={{
                    onChangeAdultE: this.onChangeAdultE,
                    onChangeAdultB: this.onChangeAdultB,
                    onChangeAdultF: this.onChangeAdultF,
                    onChangeChildE: this.onChangeChildE,
                    onChangeChildB: this.onChangeChildB,
                    onChangeChildF: this.onChangeChildF,

                }}
                    submitModal={this.submitModal}
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
                                    <Nav.Link href="/user/Edit"><EditIcon></EditIcon>Edit my info</Nav.Link>
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