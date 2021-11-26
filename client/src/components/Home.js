import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Component } from 'react';
import { Navbar, Nav, Container, NavLink } from 'react-bootstrap';






class Home extends Component {


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
                            <Nav.Link href="./user/SearchUser"><i class="fa fa-search fa-lg"></i> Search</Nav.Link>
                               
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>


            </div>
            </div>






        )


    }



}

export default Home