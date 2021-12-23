import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import EditIcon from "@mui/icons-material/Edit"
import 'font-awesome/css/font-awesome.min.css';
import LoginIcon from '@mui/icons-material/Login';
import { CardMedia } from '@mui/material';


class HomeGuest extends Component {


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
                                        <Nav.Link href="/Guest/HomeGuest"><i className="fa fa-home fa-lg"></i> Home</Nav.Link>
                                        <Nav.Link href="/Guest/SearchGuest"><i className="fa fa-search fa-lg"></i> Search</Nav.Link>
                                        <Nav.Link href="/Guest/FlightsGuest"><i className="fa fa-list fa-lg"></i> Flights List</Nav.Link>
                                        <Nav.Link href="/logIn"  className="position-absolute end-0"><LoginIcon></LoginIcon> LogIn</Nav.Link>
                                        
                                        
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>


                    </div>





                    <br />

                    <div className="row">

                        <div className="col-12 text-center">
                            <br />
                            <h2 >Guest Home</h2>
                        </div>






                    </div>

                    
                </div>


            </body>

        )


    }



}

export default HomeGuest;