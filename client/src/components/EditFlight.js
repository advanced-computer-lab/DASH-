import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import React from 'react';
import { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';



const url = window.location.href;

const flightVars = String((url.split("editFlight"))[1]).split("%");


//const flightVars = flightObj.split(" ");

const FlightNumber = flightVars[0]

const dateFlight = flightVars[8]
const toAir = flightVars[1]
const fromAir = flightVars[2]
const ecoSeats = flightVars[3]
const busSeats = flightVars[4]
const firstSeats = flightVars[5]
const depTime = flightVars[6]
const arrTime = flightVars[7]


class EditFlight extends Component {


    constructor(props) {
        super(props);
        this.onChangeFlightNumber = this.onChangeFlightNumber.bind(this);
        this.onChangeToAir = this.onChangeToAir.bind(this);
        this.onChangeFromAir = this.onChangeFromAir.bind(this);
        this.onChangeNoEconomySeats = this.onChangeNoEconomySeats.bind(this);
        this.onChangeNoBusinessSeats = this.onChangeNoBusinessSeats.bind(this);
        this.onChangeFirstSeats = this.onChangeFirstSeats.bind(this);
        this.onChangeDepTime = this.onChangeDepTime.bind(this);
        this.onChangeArrTime = this.onChangeArrTime.bind(this);
        this.onChangeDateFlight = this.onChangeDateFlight.bind(this);
        this.submit = this.submit.bind(this);

        this.state = {
            FlightNumber: '',
            toAir: '',
            fromAir: '',
            noEconomySeats: '',
            noBusinessSeats: '',
            noFirstSeats: '',
            depTime: '',
            arrTime: '',
            DateFlight: '',
        };
    }


    onChangeFlightNumber(e) {
        this.setState({
            FlightNumber: e.target.value
        });
    }

    onChangeToAir(e) {
        this.setState({
            toAir: e.target.value
        });
    }

    onChangeFromAir(e) {
        this.setState({
            fromAir: e.target.value
        });
    }


    onChangeNoEconomySeats(e) {
        this.setState({
            noEconomySeats: e.target.value
        });
    }


    onChangeNoBusinessSeats(e) {
        this.setState({
            noBusinessSeats: e.target.value
        });
    }


    onChangeFirstSeats(e) {
        this.setState({
            noFirstSeats: e.target.value
        });
    }

    onChangeDepTime(e) {
        this.setState({
            depTime: e.target.value
        });
    }


    onChangeDateFlight(e) {
        this.setState({
            DateFlight: e.target.value
        });
    }

    onChangeArrTime(e) {
        this.setState({
            arrTime: e.target.value
        });
    }





    submit(e) {
        e.preventDefault();
        // console.log(this.state);
        const fl = {
            backFlightNumber: FlightNumber,
            FlightNumber: this.state.FlightNumber,
            toAir: this.state.toAir,
            fromAir: this.state.fromAir,
            noEconomySeats: this.state.noEconomySeats,
            noFirstSeats: this.state.noFirstSeats,
            noBusinessSeats: this.state.noBusinessSeats,
            DateFlight: this.state.DateFlight,
            arrTime: this.state.arrTime,
            depTime: this.state.depTime,
        }






        console.log(fl);
        axios.post('http://localhost:8000/Flight/editFlight', fl)
            .then(res => {
                alert("Flight Edited Successfuly")
                window.location = 'http://localhost:3000/getFlights';

            }).catch((err) => {

                alert("error happened")
                window.location = "http://localhost:3000/getFlights"

            })

        window.location = '/';
        alert("Flight edited");




    }







    //   handleChange(e) {
    //     this.props.fetchCurrency(e.flightNum);
    // }

    render() {
        return (

            <div className="container">

                <div className="row">
                    <Navbar className="col-12" bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand href="./">Dash</Navbar.Brand>
                            <Nav className="me-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="./search">Search</Nav.Link>
                                <Nav.Link href="/getFlights">Flights List</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>


                </div>

                <br />

                <div className="row row-content ">


                    <h2 className="text-center">Edit Flight</h2>

                    <div className="col-12 offset-md-3 col-md-6  ">
                        <form className="search" onSubmit={this.submit}>
                            <fieldset>
                            <br/>
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-ID"  >Flight Number </label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input className="form-control" type="number" id="aligned-ID" required="true" name="id" placeholder={FlightNumber} value={this.state.FlightNumber} onChange={this.onChangeFlightNumber} />
                                    </div>
                                </div>
                                <br/>
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-toAir" >Arrival Terminal</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input className="form-control" type="text" id="aligned-toAir" required="true" name="toAir" placeholder={toAir} value={this.state.toAir} onChange={this.onChangeToAir} />
                                    </div>
                                </div>
                                <br/>
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-fromAir" >Departure Terminal</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input className="form-control" type="text" id="aligned-fromAir" required="true" name="from" placeholder={fromAir} value={this.state.fromAir} onChange={this.onChangeFromAir} />
                                    </div>
                                </div>
                                <br/>
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-econ" >Number of Economy class seats</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input type="number" className="form-control" id="aligned-econ" required="true" name="econ" placeholder={ecoSeats} value={this.state.noEconomySeats} onChange={this.onChangeNoEconomySeats} />
                                    </div>
                                </div>
                                <br/>
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-business" >Number of business class seats</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input type="number" className="form-control" id="aligned-business" required="true" name="business" placeholder={busSeats} value={this.state.noBusinessSeats} onChange={this.onChangeNoBusinessSeats} />
                                    </div>
                                </div>
                                <br/>
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-first" >Number of first class seats</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input type="number" className="form-control" id="aligned-first" required="true" name="first" placeholder={firstSeats} value={this.state.noFirstSeats} onChange={this.onChangeFirstSeats} />
                                    </div>
                                </div>
                                <br/>
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">

                                        <label htmlFor="aligned-Arr" >Arrival time</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input type="time" className="form-control" id="aligned-Arr" required="true" name="arr" placeholder={arrTime} value={this.state.arrTime} onChange={this.onChangeArrTime} />
                                    </div>
                                </div>
                                <br/>
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-Dep" >Departure time</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input type="time" className="form-control" id="aligned-Dep" required="true" name="dep" value={this.state.depTime} placeholder={depTime} onChange={this.onChangeDepTime} />
                                    </div>
                                </div>
                                <br/>
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-Date" >Flight Date</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input className="form-control" type="date" id="aligned-Date" required="true" name="dateFlight" value={this.state.DateFlight} placeholder={dateFlight} onChange={this.onChangeDateFlight} />
                                    </div>
                                </div>
                                <br/>
                                <div className="form-group row" >
                                    <div className="offset-sm-4 col-12 col-sm-6 ">
                                        <button type="submit" className="btn btn-dark form-control" >Edit</button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>




                    </div>
                </div>

            </div>
        )

    }
}


export default EditFlight;