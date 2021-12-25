import './Flight.css';
import axios from 'axios';
import React, { Component, useState, useEffect } from 'react';
import GetFlights from './FlightGetAllFlights';
import { IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
<link rel="stylesheet" href="https://unpkg.com/purecss@2.0.6/build/pure-min.css" integrity="sha384-Uu6IeWbM+gzNVXJcM9XV3SohHtmWE+3VGi496jvgX1jyvDTXfdK+rfZc8C1Aehk5" crossorigin="anonymous"></link>


const Flight = (props) => (
    <tr>
        <td>{props.flight.FlightNumber}</td>
        <td>{props.flight.toAir}</td>
        <td>{props.flight.fromAir}</td>
        <td>{props.flight.noEconomySeats}</td>
        <td>{props.flight.noBusinessSeats}</td>
        <td>{props.flight.noFirstSeats}</td>
        <td>{props.flight.depTime}</td>
        <td>{props.flight.arrTime}</td>
        <td>{props.flight.dateFlight}</td>

        <td>

            <IconButton onClick={() => { props.deleteFlight(props.flight.FlightNumber) }}><DeleteForeverIcon style={{ color: "white" }}></DeleteForeverIcon></IconButton>  </td>
    </tr>
)

class FlightSearch extends Component {

    deleteFlight(FlightNumber) {
        axios.post("http://localhost:8000/Flight/deleteFlight", { data: FlightNumber }).then(
            res => (console.log(res.data))
        ).catch(err => { console.log(err) });
        this.setState({
            flights: this.state.flights.filter(element => element.FlightNumber !== FlightNumber)
        })

    }

    flightsList() {
        
        return (this.state.flights.map(currentFlight => {
            return <Flight flight={currentFlight} deleteFlight={this.deleteFlight} />
        }))
    }



    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.deleteFlight = this.deleteFlight.bind(this);

        this.state = {
            flights: []
        }
    }

    submit(e) {
        e.preventDefault();



        axios.post('http://localhost:8000/Flight/Search', {
            id: e.target.id.value, depTime: e.target.depTime.value,
            arrTime: e.target.arrTime, dateFlight: e.target.dateFlight, toAir: e.target.toAir, fromAir: e.target.fromAir
        })
            .then(res => this.setState({ flights: res.data }))
            .catch((error) => {
                console.error(error)
            });
    }

    render() {



        return (
            <form class="pure-form pure-form-aligned" onSubmit={this.submit} method="post">

                <div>
                    <h1>Search for Flight</h1>

                    <div className="Flight">

                        <label for="aligned-ID" >Flight ID</label>
                        <input type="number" min = '0' id="aligned-ID" name="id" />

                        <label for="aligned-ID" >Departure time </label>
                        <input type="number" min = '0' id="aligned-ID" name="depTime" />

                        <label for="aligned-ID" >Arrival time</label>
                        <input type="number" min = '0' id="aligned-ID" name="arrTime" />

                        <label for="aligned-ID" >date</label>
                        <input type="number" min = '0' id="aligned-ID" name="dateFlight" />

                        <label for="aligned-ID" >To airport </label>
                        <input type="number" min = '0' id="aligned-ID" name="toAir" />

                        <label for="aligned-ID" >from airport</label>
                        <input type="number" min = '0' id="aligned-ID" name="fromAir" />




                        <br /><br /><button class="pure-button pure-button-primary">Search</button><br />




                    </div>
                    <div className="container">

                        <div className="row ">

                            <h1 className="col-12 align-self-center">Flights List</h1>
                        </div>

                        <div className="row row-header ">

                            <div className="col-12 ">

                                <table className="table table-dark d-felx">
                                    <thead>
                                        <tr>
                                            <th>Flight Number</th>
                                            <th>Arrival</th>
                                            <th>Departure</th>
                                            <th>Economy Seats</th>
                                            <th>Business Seats</th>
                                            <th>First Class Seats</th>
                                            <th>Departure Time</th>
                                            <th>Arrival Time</th>
                                            <th>Date Of Flight</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.flightsList()}
                                    </tbody>


                                </table>
                            </div>


                        </div>
                    </div>
                </div>
            </form>

        );

    }
}

export default FlightSearch;