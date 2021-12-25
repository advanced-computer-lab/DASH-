import '../Flight.css';
import axios from 'axios';
import { Component } from 'react';
//import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InfoIcon from '@mui/icons-material/Info';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
//popper.js/dist/umd/popper.min.js
import "bootstrap/dist/css/bootstrap.min.css";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
//import "react/popper";
import { Navbar, Nav, Container, Button, Modal } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';



<link rel="stylesheet" href="https://unpkg.com/purecss@2.0.6/build/pure-min.css" integrity="sha384-Uu6IeWbM+gzNVXJcM9XV3SohHtmWE+3VGi496jvgX1jyvDTXfdK+rfZc8C1Aehk5" crossorigin="anonymous"></link>

const MM = (props) => (
    <Modal show={props.show}>
        <Modal.Header >

            <b className="text-center">Booking Flight Number : {props.FlightNumber}</b>
            <Button onClick={() => { props.handleModal(props.FlightNumber) }} style={{ backgroundColor: "black" }}><CancelPresentationIcon style={{ color: 'white' }}></CancelPresentationIcon></Button>

        </Modal.Header>
        <Modal.Body>


            <link rel='asdas' href='http://localhost:3000/sign' />
            <a href='http://localhost:3000/sign'>SignUp here to Book this Flight</a>




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

            <IconButton style={{ color: "white", fontSize: 18 }} onClick={() => { props.FlightDetails(props.flight.FlightNumber) }}>Details &nbsp; <InfoIcon style={{ color: "white" }}></InfoIcon></IconButton>

        </td>

    </tr>

)


class SearchGuest extends Component {


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
        this.onChangeAvailE = this.onChangeAvailE.bind(this);
        this.onChangeAvailB = this.onChangeAvailB.bind(this);
        this.onChangeAvailF = this.onChangeAvailF.bind(this);
        this.onChangePriceFrom = this.onChangePriceFrom.bind(this);
        this.onChangePriceTo = this.onChangePriceTo.bind(this);

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
            AvailE: '',
            AvailB: '',
            AvailF: '',
            PriceFrom : '' ,
            PriceTo : '',

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
            Email: localStorage.getItem("Email"),
            FlightNumber: this.state.modalFlightNumber,
            AdultE: this.state.AdultE,
            AdultB: this.state.AdultB,
            AdultF: this.state.AdultF,

            ChildE: this.state.ChildE,
            ChildB: this.state.ChildB,
            ChildF: this.state.ChildF,
            totalPrice: 0,
        }
        const x = {
            FlightNumber: this.state.modalFlightNumber,
        }

        axios.post('http://localhost:8000/Flight/av', x, {
            headers: {
                "guest":"guest"
            }
        })
            .then(res => {
                //if(res.data =="guest")
                {

                    const ae = Number(res.data.AE) - (Number(request.AdultE) + Number(request.ChildE));
                    const ab = Number(res.data.AB) - (Number(request.AdultB) + Number(request.ChildB));
                    const af = Number(res.data.AF) - (Number(request.AdultF) + Number(request.ChildF));
                    const pe = (Number(res.data.priceE) * Number(request.AdultE)) + (Number(res.data.priceE) * Number(request.ChildE) * 0.5);
                    const pb = (Number(res.data.priceB) * Number(request.AdultB)) + (Number(res.data.priceB) * Number(request.ChildB) * 0.5);
                    const pf = (Number(res.data.priceF) * Number(request.AdultF)) + (Number(res.data.priceF) * Number(request.ChildF) * 0.5);
                    const total = pe + pb + pf;
                    request.totalPrice = total;
                    if (window.confirm("The total price is :" + total + "\n" + 'Are you sure you want to book this flight? ')) {
                        if (ae > -1 && ab > -1 && af > -1) {
                            
                            axios.post('http://localhost:8000/ticket/book', request,{
                                headers: {
                                    "guest":"guest"
                                }
                            })
                                .then((response) => {
                                    if(response.data == "guest")
                                    {

                                        if (response) alert("Flight Booked Successfuly");
                                        else alert("Error Happeed");
                                    }

                                }, (error) => {
                                    alert("Error Happened ")
                                });
                        } else {
                            alert('No enough seats for your request');
                        }
                    } else {

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
    onChangePriceFrom(e){
        this.setState({
            PriceFrom : e.target.value

        })
    }
    onChangePriceTo(e){
        this.setState({
            PriceTo : e.target.value

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
            AvailE: this.state.AvailE,
            AvailB: this.state.AvailB,
            AvailF: this.state.AvailF,
            PriceFrom : this.state.PriceFrom,
            PriceTo : this.state.PriceTo,



        }


        axios.post('http://localhost:8000/Flight/FindFlight', f,{
            headers:{
                "guest":"guest"
            }
        })
            .then(res => {
                //if(res.data == "guest")
                {

                    this.setState({ flights: res.data })
                } 


            })


    }
    FlightDetails(id) {
        var temp = { FlightNumber: id };
        axios.post('http://localhost:8000/Flight/showFlight', temp ,{
            headers:{
                "guest":"guest"
            }
        } )
            .then(res => {
                // if(res.data == "guest")
                {

                    this.setState({ showFlight: res.data })
                }


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



            return <div className="container-fluid ">
                <form style={{backgroundColor:"rgba(255,255,255,0.5)"}} className="details">



                    <strong style={{ marginLeft: '185px' }}>Flight Number:{currentFlight.FlightNumber} </strong>
                    <br></br>
                    <br></br>
                    

                    <div className='row row-content' >
                        <div className="col-6" style={{ textAlign: 'left' }} >
                            <p>Baggage Allowance:{currentFlight.baggageallowance} </p>
                            <strong>Prices for Adults :</strong>
                            <p>Economy: {currentFlight.priceEconomy}$    </p>
                            <p>Business: {currentFlight.pricebusiness}$ </p>
                            <p> First: {currentFlight.priceFirst}$ </p>
                            <strong >Available Seats:</strong>
                            <p> Economy: {currentFlight.AvailE} seats </p>

                            
                        </div>
                        <div className="col-6" style={{ textAlign: 'left' }}>
                        <p style={{ marginLeft: '90px' }}>Trip duration:{(Math.abs((time2 - time1) / (1000 * 60 * 60)).toFixed(2)) + "  hours"} </p>
                        <strong style={{ marginLeft: '90px' }}>Prices for Children:</strong>
                             <p style={{ marginLeft: '90px' }}>Economy: {(currentFlight.priceEconomy) / 2}$</p>
                            <p style={{ marginLeft: '90px' }}>First: {(currentFlight.priceFirst) / 2}$</p>
                            <p style={{ marginLeft: '90px' }}>Business: {(currentFlight.pricebusiness) / 2}$ </p>
                            <br></br>
                            <p style={{ marginLeft: '90px' }}> Business: {currentFlight.AvailB} seats </p>
                            
                            
                        </div>
                       <p> First: {currentFlight.AvailF} seats</p>
                        <div className="row row-content"><Button className="btn-dark" style={{ width: "100%" }} onClick={() => {
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


                </form>

            </div>



        }))

    }

    render() {

        return (


            <body style={{height:"100vh" ,backgroundImage:'url("https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dHJhdmVsJTIwbWFwfGVufDB8fDB8fA%3D%3D&w=1000&q=80")' ,backgroundRepeat:"no-repeat" , backgroundSize:"100%" }}>


            <div className="container-fluid">



                <div className="row">
                    <Navbar expand="sm" bg="dark" variant="dark">
                        <Container fluid>

                            <Navbar.Brand href="./">Dash</Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                <Nav navbarScroll className="me-auto">


                                    <Nav.Link href="/Guest/HomeGuest"><i className="fa fa-home fa-lg"></i> Home</Nav.Link>
                                    <Nav.Link href="/Guest/SearchGuest"><i className="fa fa-search fa-lg"></i> Search</Nav.Link>
                                    <Nav.Link href="/Guest/FlightsGuest"><i className="fa fa-list fa-lg"></i> Flights List</Nav.Link>
                                    <Nav.Link href="/logIn" className="position-absolute end-0"><LoginIcon></LoginIcon> LogIn</Nav.Link>






                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>


                </div>


                <br />

                <div className="row row-content">


                    <div className="col-12 col-md-6">


                        <form style={{backgroundColor:"rgba(255,255,255,0.5)"}} className="search" onSubmit={this.submit}>

                            <div className="form-group row">
                                <div className="col-6 col-md-3">
                                    <label htmlFor="aligned-ID"  >Flight Number </label>
                                    &nbsp;&nbsp;
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="number" min = '0' id="aligned-ID" placeholder="Flight Number" name="id" className="form-control" value={this.state.FlightNumber} onChange={this.onChangeN} />
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
                                    <label htmlFor="aligned-Dep" >Number of available seats </label>
                                    &nbsp;&nbsp;
                                </div>

                                <div className="col-12 col-md-3">
                                    <input type="number" min='0' id="aligned-ID" placeholder="Economy" name="id2" className="form-control" value={this.state.AvailE} onChange={this.onChangeAvailE} />
                                    &nbsp;&nbsp;
                                </div>
                                <div className="col-12 col-md-3">
                                    <input type="number" min='0' id="aligned-ID" placeholder="Business" name="id2" className="form-control" value={this.state.AvailB} onChange={this.onChangeAvailB} />
                                    &nbsp;&nbsp;
                                </div>
                                <div className="col-12 col-md-3">
                                    <input type="number" min='0' id="aligned-ID" placeholder="First" name="id2" className="form-control" value={this.state.AvailF} onChange={this.onChangeAvailF} />
                                    &nbsp;&nbsp;
                                </div>
                            </div>
                           
                            
                            
                            <div className="form-group row">

                                <div className="col-6 col-md-3">
                                    <label htmlFor="aligned-Dep" >Price: </label>
                                    &nbsp;&nbsp;
                                </div>

                                <div className="col-12 col-md-3">
                                <input type="number" min='0' id="aligned-ID" placeholder="From" name="id2" className="form-control" value={this.state.PriceFrom} onChange={this.onChangePriceFrom} />
                                    
                                    &nbsp;&nbsp;
                                </div>
                                <div className="col-12 col-md-3">
                                <input type="number" min='0' id="aligned-ID" placeholder="To" name="id2" className="form-control" value={this.state.PriceTo} onChange={this.onChangePriceTo} />
                                    
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

                        {this.test2()}


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
            </body>
        );



    }



}

export default SearchGuest;