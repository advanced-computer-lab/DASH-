import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import EditIcon from "@mui/icons-material/Edit"
import 'font-awesome/css/font-awesome.min.css';


class Home extends Component {


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
<<<<<<< HEAD
<<<<<<< HEAD
                                        <Nav.Link href="/user/reserve"><i className="fa fa-clipboard fa-lg"></i> My Flights</Nav.Link>
                                        <Nav.Link href="/user/Edit"><EditIcon></EditIcon>Edit my info</Nav.Link>
=======
                                        <Nav.Link href="/user/myFlights"><i className="fa fa-clipboard fa-lg"></i> My Flights</Nav.Link>
>>>>>>> 71ffa955faf9e3512af78124ebc4da1cb5a1b018
=======
                                        <Nav.Link href="/user/myFlights"><i className="fa fa-clipboard fa-lg"></i> My Flights</Nav.Link>
>>>>>>> 71ffa955faf9e3512af78124ebc4da1cb5a1b018
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
                            <h2 >User Home</h2>
                        </div>



                    </div>
                </div>


            </body>

        )


    }



}

export default Home;