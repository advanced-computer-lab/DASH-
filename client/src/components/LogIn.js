import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Component } from 'react';
import { Navbar, Nav, Container, NavLink } from 'react-bootstrap';






class LogIn extends Component {


    render() {
        return (


            <div className="container-fluid">
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




        )


    }



}

export default LogIn