import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";


class NavBar extends Component {
    constructor(props){
        super(props);
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
                                        <Nav.Link href="/"><i className="fa fa-home fa-lg"></i> Home</Nav.Link>
                                        <Nav.Link href="/add"><i class="fa fa-fighter-jet fa-lg"></i> Add flight </Nav.Link>
                                        <Nav.Link href="./search"><i class="fa fa-search fa-lg"></i> Search</Nav.Link>
                                        <Nav.Link href="/getFlights"><i class="fa fa-list fa-lg"></i> Flights List</Nav.Link>

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

                    <div className="row">

                        <div className="col-12 text-center">
                            <br />
                            <h2 >Admin Home</h2>
                        </div>



                    </div>
                </div>


            </body>

        )


    }



}

export default NavBar