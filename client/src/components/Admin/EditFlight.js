import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import React from 'react';
import { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';



const url = window.location.href;

const flightVars = String((url.split("editFlight"))[1]).split("%");


//const flightVars = flightObj.split(" ");

const FlightNumber = flightVars[0]


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
            arrTime: this.state.arrTime,
            depTime: this.state.depTime,
        }






       
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
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>


                </div>

                <br />

                <div className="row row-content ">


                    <h2 className="text-center">Edit Flight</h2>

                    <div className="col-12 offset-md-3 col-md-6  ">
                        <form className="search" onSubmit={this.submit}>
                            <fieldset>
                                <br />
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-ID"  >Flight Number </label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input className="form-control" type="number" id="aligned-ID" name="id" placeholder={FlightNumber} value={this.state.FlightNumber} onChange={this.onChangeFlightNumber} />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-toAir" >Arrival Terminal</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input className="form-control" type="text" id="aligned-toAir" name="toAir" placeholder={toAir} value={this.state.toAir} onChange={this.onChangeToAir} />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-fromAir" >Departure Terminal</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input className="form-control" type="text" id="aligned-fromAir" name="from" placeholder={fromAir} value={this.state.fromAir} onChange={this.onChangeFromAir} />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-econ" >Number of Economy class seats</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input type="number" className="form-control" id="aligned-econ" name="econ" placeholder={ecoSeats} value={this.state.noEconomySeats} onChange={this.onChangeNoEconomySeats} />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-business" >Number of business class seats</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input type="number" className="form-control" id="aligned-business" name="business" placeholder={busSeats} value={this.state.noBusinessSeats} onChange={this.onChangeNoBusinessSeats} />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-first" >Number of first class seats</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input type="number" className="form-control" id="aligned-first" name="first" placeholder={firstSeats} value={this.state.noFirstSeats} onChange={this.onChangeFirstSeats} />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">

                                        <label htmlFor="aligned-Arr" >Arrival time</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input type="datetime-local" className="form-control" id="aligned-Arr" name="arr" placeholder={arrTime} value={this.state.arrTime} onChange={this.onChangeArrTime} />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-Dep" >Departure time</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input type="datetime-local" className="form-control" id="aligned-Dep" name="dep" value={this.state.depTime} placeholder={depTime} onChange={this.onChangeDepTime} />
                                    </div>
                                </div>
                                <br />
                                <br />
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