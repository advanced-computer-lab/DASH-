import { Component } from "react";
import axios from "axios";
import { IconButton } from '@mui/material';


class MyFlights extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.flightlist = this.flightlist.bind(this);

        this.state = {
            MyFlight: [],
        }

        axios.get("http://localhost8000/user/isAuth", {
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

    submit() {
        var array = [];
        
        const temp = {
            mail: localStorage.getItem("Email"),
        }
        axios.post('http://localhost:8000/ticket/myFlights', temp, {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        })
            .then((res) => {

                this.setState({ MyFlight: res.data })





            }

            )

    }

    flightlist() {
        

        return (this.state.MyFlight.map(currentFlight => {
            return <p>{currentFlight} </p>
        }))

    }


    render() {


        return (
            <body>

                <button onClick={this.submit}>Show details</button>

                <div>
                    {this.flightlist()}
                </div>
            </body>
        )








    }

}







export default MyFlights;