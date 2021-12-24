import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Component } from 'react';
import { TextField, Button } from '@mui/material';

import { Navbar, Nav, Container } from 'react-bootstrap';
import EditIcon from "@mui/icons-material/Edit"
import 'font-awesome/css/font-awesome.min.css';
import '../Flight.css';
import axios from 'axios';

import StripeCheckout from 'react-stripe-checkout';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';



class Pay extends Component {


    constructor(props) {
        super(props);
        this.state = {
            OldPass: '',
            newPass: '',
            newPassRep: '',
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

    onToken = (token) => {
        fetch('/save-stripe-token', {
            method: 'POST',
            body: JSON.stringify(token),
        }).then(response => {
            response.json().then(data => {
                alert(`We are in business, ${data.email}`);
            });
        });
    }

    LogIn = () => {
        var old = this.state.OldPass
        var newPass = this.state.newPass
        var newPassRep = this.state.newPassRep


        const user = {
            Email: localStorage.getItem("Email"),
            Password: old
        };


        axios.post('http://localhost:8000/user/logIn', user)
            .then(res => {
                if (res.data.msg === "Invalid Password") {
                    alert("Invalid Password");
                }
                else if (newPass != newPassRep) {
                    alert("New Password Fields Doesn't match!")
                }
                else {

                    const user = {
                        Email: localStorage.getItem("Email"),
                        Password: newPass
                    };
                    axios.post('http://localhost:8000/user/ChangePassword', user, {
                        headers: {
                            "x-auth-token": localStorage.getItem("token")
                        }
                    })
                        .then((res) => {
                            if (res.data == "Token is not valid") {
                                alert("Token Expired LogIn Again");
                                window.location = "/logIn";
                            }
                        }
                        ).catch(err => console.log(err));

                    window.location.reload()
                }


            }).catch(err => console.log(err));

    }


    SetValues = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    // componentDidMount(){
    //     axios.get("http://localhost8000/user/isAuth",{
    //         headers:{
    //             "x-auth-token":localStorage.getItem("token"),
    //         }
    //     }).then(res=>{
    //         if(res.data === "Token is not valid"){
    //             alert("Token expired log in again please");
    //             window.location="/logIn"
    //         }else{
    //             alert("token still valid")
    //         }
    //     })
    // }

    render() {




        return (


            <body>


                <div className="container-fluid">


                    <div className="row">
                        <Navbar expand="sm" bg="dark" variant="dark">
                            <Container fluid>
                                <Navbar.Brand href="./">Dash</Navbar.Brand>
                                <Navbar.Toggle aria-controls="navbarScroll" />
                                <Navbar.Collapse id="navbarScroll">
                                    <Nav navbarScroll className="me-auto">
                                        <Nav.Link href="/user/home"><i className="fa fa-home fa-lg"></i> Home</Nav.Link>
                                        <Nav.Link href="/user/search"><i className="fa fa-search fa-lg"></i> Search</Nav.Link>
                                        <Nav.Link href="/user/all_flights"><i className="fa fa-list fa-lg"></i> Flights List</Nav.Link>
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


                    <div >

                        <br />
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField required onChange={(e) => this.SetValues(e)} type="password" name="OldPass" id="outlined-basic1" label="Old Password" variant="outlined" />
                        </div>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField required onChange={(e) => this.SetValues(e)} type="password" name="newPass" id="outlined-basic2" label="New Password" variant="outlined" />
                        </div>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField required onChange={(e) => this.SetValues(e)} type="password" name="newPassRep" id="outlined-basic3" label="Repeat New Password" variant="outlined" />
                        </div>
                        <br />

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button onClick={() => { this.LogIn() }} type="submit" variant="contained">Change Password</Button>
                        </div>
                        <br />
                    </div>
                </div>

            </body>

        )


    }



}

export default Pay;