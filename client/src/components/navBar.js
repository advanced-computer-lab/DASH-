
//import './NavBar.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Component} from 'react';
import {Navbar, Nav, Container, NavLink} from 'react-bootstrap';






class NavBar extends Component{


    render(){
        return(
            
            


            <div className="container">


            <div className="row">
            <Navbar className="col-12" bg="dark" variant="dark">
                    <Container>
                    <Navbar.Brand href="./">Dash</Navbar.Brand>
                    <Nav className="me-auto">
                      <Nav.Link href="/">Home</Nav.Link>
                      <Nav.Link href = "/add">Add flight </Nav.Link>
                      <Nav.Link href="./search">Search</Nav.Link>
                      <Nav.Link href="/getFlights">Flights List</Nav.Link>
                    </Nav>
                    </Container>
                </Navbar>
  

            </div>
                

            
            
                
                <br/>

                <div className="row">

                    <div className="col-12 text-center">
                        <br/>
                        <h2 >Admin Home</h2>
                    </div>
                    


                </div>
            </div>

            

        )
    
    
    }



}

export default NavBar