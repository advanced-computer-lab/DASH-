import './Flight.css';
import axios from 'axios';
import React, { Component, useState, useEffect } from 'react';
<link rel="stylesheet" href="https://unpkg.com/purecss@2.0.6/build/pure-min.css" integrity="sha384-Uu6IeWbM+gzNVXJcM9XV3SohHtmWE+3VGi496jvgX1jyvDTXfdK+rfZc8C1Aehk5" crossorigin="anonymous"></link>



class FlightSearch extends Component {


    submit(e) {
        e.preventDefault();

        axios.post('http://localhost:8000/Flight/Search', {id : e.target.id.value})
            .then(res => console.log(res.data))
            .catch((error) => {
                console.error(error)
            });

        axios.get('http://localhost:8000/Flight/Search').then(res=>
        {
            console.log("TEST FLIGHT:   " + res.data.flightValue);
            console.log("get");
        });
    }

    render() {



        return (
            <form class="pure-form pure-form-aligned" onSubmit={this.submit} method="post">

                <div>
                    <h1>Search for Flight</h1>

                    <div className="Flight">

                        <label for="aligned-ID" >Flight ID</label>
                        <input type="number" id="aligned-ID" placeholder="ID" name="id" />
                        <button class="pure-button pure-button-primary">Search</button>

                    </div>
                </div>
            </form>

        );

    }
}

export default FlightSearch;