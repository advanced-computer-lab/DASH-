import '../Flight.css';
import axios from 'axios';
import { Component } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
//popper.js/dist/umd/popper.min.js
import "bootstrap/dist/css/bootstrap.min.css";
//import "react/popper";
import { Navbar, Nav, Container, Button, Modal } from 'react-bootstrap';
import { integerPropType } from '@mui/utils';



<link rel="stylesheet" href="https://unpkg.com/purecss@2.0.6/build/pure-min.css" integrity="sha384-Uu6IeWbM+gzNVXJcM9XV3SohHtmWE+3VGi496jvgX1jyvDTXfdK+rfZc8C1Aehk5" crossorigin="anonymous"></link>

const MM = (props) => (
    <Modal show={props.show}>
        <Modal.Header ><b className="text-center">Booking Flight Number : {props.FlightNumber}</b></Modal.Header>
        <Modal.Body>
            <form onSubmit={props.submitModal}>
                <strong>Number of economy seats</strong>
                <div className="form-group row">
                    <label className="col-4 col-md-2 col-form-label">Adult:</label>
                    <div className="col-8 col-md-4">
                        <input type="number" className="form-control " placeholder="" value={props.Seats.AdultE} onChange={props.func.onChangeAdultE} />
                    </div>
                    <label className="col-4 col-md-2 col-form-label">Child:</label>
                    <div className="col-8 col-md-4">
                        <input type="number" className="form-control " placeholder="" value={props.Seats.ChildE} onChange={props.func.onChangeChildE} />
                    </div>
                </div>
                <br />
                <strong>Number of business class seats</strong>
                <div className="form-group row">
                    <label className="col-4 col-md-2 col-form-label">Adult:</label>
                    <div className="col-8 col-md-4">
                        <input type="number" className="form-control " placeholder="" value={props.Seats.AdultB} onChange={props.func.onChangeAdultB} />
                    </div>
                    <label className="col-4 col-md-2 col-form-label">Child:</label>
                    <div className="col-8 col-md-4">
                        <input type="number" className="form-control " placeholder="" value={props.Seats.ChildB} onChange={props.func.onChangeChildB} />
                    </div>

                </div>
                <br />
                <div className="form-group row">
                    <strong>Number of first class seats</strong>
                    <label className="col-4 col-md-2 col-form-label">Adult:</label>
                    <div className="col-8 col-md-4">
                        <input type="number" className="form-control " placeholder="" value={props.Seats.AdultF} onChange={props.func.onChangeAdultF} />
                    </div>
                    <label className="col-4 col-md-2 col-form-label">Child:</label>
                    <div className="col-8 col-md-4">
                        <input type="number" className="form-control " placeholder="" value={props.Seats.ChildF} onChange={props.func.onChangeChildF} />
                    </div>
                </div>
                <br />
                <div className="form-group row ">

                    <button className="offset-md-1  col-md-4 btn btn-dark" onClick={() => { props.handleModal(props.FlightNumber) }}>Cancel</button>
                    <button type="submit" className="offset-md-3   col-md-4 btn btn-dark">Book</button>

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
        <td>{props.flight.noEconomySeats}</td>
        <td>{props.flight.noBusinessSeats}</td>
        <td>{props.flight.noFirstSeats}</td>
        <td>{props.flight.depTime}</td>
        <td>{props.flight.arrTime}</td>


        <td>

            <button onClick={() => { props.FlightDetails(props.flight.FlightNumber) }}>Show details</button>

        </td>

    </tr>

)
const showFlight = (props) => (
    <tr >
        <td>{props.showFlight[0].baggageallowance}</td>


    </tr>
)

class SearchUser extends Component {


    constructor(props) {
        super(props);

        this.submit = this.submit.bind(this);
        this.onChangeN = this.onChangeN.bind(this);
        this.FlightDetails = this.FlightDetails.bind(this);
        this.onChangetoAir = this.onChangetoAir.bind(this);
        this.onChangefromAir = this.onChangefromAir.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeArrival = this.onChangeArrival.bind(this);
        this.onChangeDep = this.onChangeDep.bind(this);
        this.onChangeNumberPass = this.onChangeNumberPass.bind(this);
        this.onChangeCabinClass = this.onChangeCabinClass.bind(this);
        this.test2 = this.test2.bind(this);
        this.handleModal = this.handleModal.bind(this);

        this.onChangeAdultE = this.onChangeAdultE.bind(this);
        this.onChangeAdultB = this.onChangeAdultB.bind(this);
        this.onChangeAdultF = this.onChangeAdultF.bind(this);
        this.onChangeChildE = this.onChangeChildE.bind(this);
        this.onChangeChildF = this.onChangeChildF.bind(this);
        this.onChangeChildB = this.onChangeChildB.bind(this);
        this.submitModal = this.submitModal.bind(this);

        this.state = {
            FlightNumber: '',
            toAir: '',
            fromAir: '',
            depTime: '',
            arrTime: '',
            NumPass: '',
            CabinClass: '',
            flights: [],
            showFlight: [],
            show: false,

            modalFlightNumber: '',

            AdultE: '',
            AdultB: '',
            AdultF: '',

            ChildE: '',
            ChildB: '',
            ChildF: '',


        }
    }


    handleModal(id) {
        this.setState({
            show: !this.state.show,
            modalFlightNumber: id,
        })
    }


    submit(e) {

        e.preventDefault();
        this.flightsList();

    }

    submitModal(e) {
        // if(this.state.modalFlightNumber==100) window.location='/user/home'
        e.preventDefault();
        const request = {
            Email:localStorage.getItem("Email"),
            FlightNumber: this.state.modalFlightNumber,
            AdultE: this.state.AdultE,
            AdultB: this.state.AdultB,
            AdultF: this.state.AdultF,

            ChildE: this.state.ChildE,
            ChildB: this.state.ChildB,
            ChildF: this.state.ChildF,
        }
        const x = {
            FlightNumber: this.state.modalFlightNumber,
        }

        axios.post('http://localhost:8000/Flight/av', x)
            .then(res => {
                const ae = Number(res.data.AE) - (Number(request.AdultE) + Number(request.ChildE));
                const ab = Number(res.data.AB) - (Number(request.AdultB) + Number(request.ChildB));
                const af = Number(res.data.AF) - (Number(request.AdultF) + Number(request.ChildF));
                if (ae > -1 && ab > -1 && af > -1) {
                    console.log(request)
                    axios.post('http://localhost:8000/ticket/book', request)
                        .then(() => alert("Flight Booked Successfuly"))
                        .catch(() => alert("error happened"));
                }
               
            }).catch(err => {
                alert(err);
            });

    }



    onChangeN(e) {
        this.setState({ FlightNumber: e.target.value })
    }
    onChangetoAir(e) {
        this.setState({ toAir: e.target.value })
    }
    onChangefromAir(e) {
        this.setState({
            fromAir: e.target.value
        });

    }

    onChangeDate(e) {
        this.setState({
            dateFlight: e.target.value
        });
    }
    onChangeArrival(e) {
        this.setState({
            arrTime: e.target.value
        })
    }

    onChangeDep(e) {
        this.setState({
            depTime: e.target.value
        })
    }
    onChangeNumberPass(e) {
        this.setState({
            NumPass: e.target.value
        })
    }
    onChangeCabinClass(e) {
        this.setState({
            CabinClass: e.target.value
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


    flightsList() {
        const f = {
            FlightNumber: this.state.FlightNumber,
            toAir: this.state.toAir,
            fromAir: this.state.fromAir,
            dateFlight: this.state.dateFlight,
            arrTime: this.state.arrTime,
            depTime: this.state.depTime,
            NumPass: this.state.noEconomySeats,
            CabinClass: this.state.noFirstSeats,



        }


        axios.post('http://localhost:8000/Flight/FindFlight', f)
            .then(res => {
                this.setState({ flights: res.data })


            })


    }
    FlightDetails(id) {
        var temp = { FlightNumber: id };
        axios.post('http://localhost:8000/Flight/showFlight', temp)
            .then(res => {
                this.setState({ showFlight: res.data })


            })


    }

    test() {
        return (this.state.flights.map(currentFlight => {
            return <Flight flight={currentFlight} FlightDetails={this.FlightDetails} />
        }))

    }

    test2() {
        return (this.state.showFlight.map(currentFlight => {

            var time1 = Date.parse(currentFlight.arrTime);
            var time2 = Date.parse(currentFlight.depTime);



            return <div>
                <p style={{ textAlign: 'center' }}>Flight Details Flno: :{currentFlight.FlightNumber} </p>

                <div className='column' >
                    <div style={{ textAlign: 'left' }} >
                        <p>Baggage Allowance:{currentFlight.baggageallowance} </p>
                        <p>Adults Economy:{currentFlight.priceEconomy}</p>
                        <p>Adults First:{currentFlight.priceFirst}</p>
                        <p>Adults Business:{currentFlight.pricebusiness} </p>
                    </div>
                    <div style={{ textAlign: 'left' }}>

                        <p>children Economy:{(currentFlight.priceEconomy) / 2}</p>
                        <p>children First:{(currentFlight.priceFirst) / 2}</p>
                        <p>children Business:{(currentFlight.pricebusiness) / 2} </p>
                        <p>Trip duration:{(Math.abs((time2 - time1) / (1000 * 60 * 60)).toFixed(2)) + "hours"} </p>


                    </div>
                    <div><Button onClick={() => {
                        this.handleModal(currentFlight.FlightNumber)

                    }}>Book</Button> </div>
                </div>


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

                <div className="row row-content">


                    <div className="col-12 col-md-6">


                        <form className="search" onSubmit={this.submit}>

                            <div className="form-group row">
                                <div className="col-6 col-md-3">
                                    <label htmlFor="aligned-ID"  >Flight Number </label>
                                    &nbsp;&nbsp;
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="number" id="aligned-ID" placeholder="Flight Number" name="id" className="form-control" value={this.state.FlightNumber} onChange={this.onChangeN} />
                                    &nbsp;&nbsp;
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-6 col-md-3" >
                                    <label htmlFor="aligned-toAir" >Arrival Airport</label>
                                    &nbsp;&nbsp;

                                </div>

                                <div className="col-12 col-md-9">
                                    <input type="text" placeholder="to" name="id" className="form-control" value={this.state.toAir} onChange={this.onChangetoAir} />

                                    &nbsp;&nbsp;
                                </div>
                            </div>


                            <div className="form-group row">
                                <div className="col-6 col-md-3">
                                    <label htmlFor="aligned-fromAir" >Departure Airport</label>
                                    &nbsp;&nbsp;
                                </div>
                                <div className="col-12 col-md-9">
                                    <input className="form-control" type="text" placeholder="from" id="aligned-fromAir" name="from" value={this.state.fromAir} onChange={this.onChangefromAir} />
                                    &nbsp;&nbsp;
                                </div>
                            </div>

                            <div className="form-group row">

                                <div className="col-6 col-md-3">

                                    <label htmlFor="aligned-Arr" >Arrival time</label>
                                    &nbsp;&nbsp;

                                </div>
                                <div className="col-12 col-md-9">
                                    <input className="form-control" type="datetime-local" id="aligned-Arr" name="arr" value={this.state.arrTime} onChange={this.onChangeArrival} />
                                    &nbsp;&nbsp;
                                </div>
                            </div>


                            <div className="form-group row">

                                <div className="col-6 col-md-3">
                                    <label htmlFor="aligned-Dep" >Departure time</label>
                                    &nbsp;&nbsp;
                                </div>

                                <div className="col-12 col-md-9">
                                    <input className="form-control" type="datetime-local" id="aligned-Dep" name="dep" value={this.state.depTime} onChange={this.onChangeDep} />
                                    &nbsp;&nbsp;
                                </div>
                            </div>

                            <div className="form-group row">

                                <div className="col-6 col-md-3">
                                    <label htmlFor="aligned-Dep" >Number of passengers</label>
                                    &nbsp;&nbsp;
                                </div>

                                <div className="col-12 col-md-9">
                                    <input type="number" id="aligned-ID" placeholder="Number of passsengers" name="id2" className="form-control" value={this.state.NumPass} onChange={this.onChangeNumberPass} />
                                    &nbsp;&nbsp;
                                </div>
                            </div>



                            <div className="form-group row">

                                <div className="col-6 col-md-3">
                                    <label htmlFor="aligned-Dep" >Cabin class</label>
                                    &nbsp;&nbsp;
                                </div>

                                <div className="col-12 col-md-9">
                                    <input type="next" id="aligned-ID" placeholder="Cabin class" name="id2" className="form-control" value={this.state.CabinClass} onChange={this.onChangeCabinClass} />
                                    &nbsp;&nbsp;
                                </div>
                            </div>


                            <div className="form-group row">
                                <div className="offset-md-3 col-9 col-md-5" >
                                    <button className=" btn btn-dark form-control" type="submit">Search</button>
                                </div>
                            </div>

                        </form>

                        <br />
                    </div>
                    <div className="cl-12 col-md-6">

                        <form className="details">

                            {this.test2()}

                        </form>


                    </div>

                    <div className="row row-header ">

                        <div className="col-12 ">

                            <table className="table table-dark d-felx">
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
                                    {this.test()}

                                </tbody>


                            </table>

                        </div>



                    </div>



                </div>



            </div>
        );



    }



}

export default SearchUser;