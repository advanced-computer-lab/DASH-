import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import EditIcon from "@mui/icons-material/Edit"
import 'font-awesome/css/font-awesome.min.css';
import LoginIcon from '@mui/icons-material/Login';
import { CardMedia } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import CLOUDS from 'vanta/dist/vanta.clouds.min'

import * as THREE from 'three'




class HomeGuest extends Component {


    constructor(props) {
        super(props);
       
    }
   
    


    render() {
        return (


            <body >
                 <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"></script>

                 <div   >
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


                     
                     
                   


                     <Card style={{  backgroundImage: `url("https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fc/ed/sharm-el-sheikh.jpg?w=700&h=500&s=1")` ,
                                 backgroundSize: "200px 200px" }} sx={{ maxWidth: 200 , maxHeight:200 }}>
      <CardContent   >
        <Typography style={{filter : "brightness(100%) " }} sx={{ fontSize: 17 }} color="whitesmoke" gutterBottom>
            <FlightTakeoffIcon></FlightTakeoffIcon>
          cairo
        </Typography>
   

        <Typography sx={{ fontSize: 17 }} color="whitesmoke" gutterBottom>
            <FlightLandIcon></FlightLandIcon>
          Sharm El sheikh
        </Typography>

        <Typography sx={{ fontSize: 17 }} color="whitesmoke" gutterBottom>
           
          Start from 100$
        </Typography>
       
        
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>

                     

                     
                     

                     





                    </div>

                    
                </div>

             </div>
            </body>

        )


    }



}

export default HomeGuest;