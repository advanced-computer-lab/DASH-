import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import EditIcon from "@mui/icons-material/Edit"
import 'font-awesome/css/font-awesome.min.css';
import LoginIcon from '@mui/icons-material/Login';
import { CardMedia, IconButton } from '@mui/material';
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
import { height } from "@mui/system";




class HomeGuest extends Component {


    constructor(props) {
        super(props);
        this.vantaRef = React.createRef()
       
    }
    componentDidMount() {
        this.vantaEffect = CLOUDS({
          el: this.vantaRef.current,
          THREE: THREE
    
        })
      }
    
      componentWillUnmount() {
        if (this.vantaEffect) this.vantaEffect.destroy()
      }
    
   
    


    render() {
        return (


            <body >
                 <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"></script>

                 

                <div style={{height:"100vh"}} ref={this.vantaRef}  >
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

     <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 ,marginTop:"150px"   }}>
         <div onClick={e =>  window.location = "/Guest/FlightsGuest"} >
       <div style={{width:"200px", height:"200px" , marginLeft:"150px"  ,backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6PRRpuPWI3fVA8Zj-auv03aAAdavquJ4i3g&usqp=CAU")` ,
                                 backgroundSize: "200px 200px"  }}>
                                     
                                    <p style={{color:"black",  marginLeft:"60px",fontSize:"20px"}}> <strong   >Offer</strong> </p>


                                     <p style={{color:"black", fontSize:"20px"}}> <strong   >  Cairo     <FlightTakeoffIcon></FlightTakeoffIcon>          </strong> </p>

                                     <p style={{color:"black",  fontSize:"20px"}}> <strong   >  Sharm El sheikh     <FlightLandIcon></FlightLandIcon>          </strong> </p>

                                     <p style={{color:"black",  fontSize:"20px"}}> <strong   >  Starts from 100$               </strong> </p>
                                     
                                     
                                     
                                     </div> 
                            </div>

                                     <div onClick={e =>  window.location = "/Guest/FlightsGuest"} style={{width:"200px", height:"200px", marginLeft:"150px"  ,backgroundImage: `url("https://media.tacdn.com/media/attractions-splice-spp-674x446/07/b3/07/25.jpg")` ,
                                 backgroundSize: "200px 200px"  }}>
                                     
                                    <p style={{color:"black",  marginLeft:"60px",fontSize:"20px"}}> <strong   >Offer</strong> </p>


                                     <p style={{color:"black",  fontSize:"20px"}}> <strong   >  Cairo     <FlightTakeoffIcon></FlightTakeoffIcon>          </strong> </p>

                                     <p style={{color:"black",  fontSize:"20px"}}> <strong   >  Luxor     <FlightLandIcon></FlightLandIcon>          </strong> </p>
                                     
                                     <p style={{color:"black",  fontSize:"20px"}}> <strong   >  Starts from 150$               </strong> </p>
                                     
                                     </div> 
                                     <div onClick={e =>  window.location = "/Guest/FlightsGuest"} style={{width:"200px", height:"200px" , marginLeft:"150px"  ,backgroundImage: `url("https://media.tacdn.com/media/attractions-splice-spp-674x446/06/6a/e8/1c.jpg")` ,
                                 backgroundSize: "200px 200px"  }}>
                                     
                                    <p style={{color:"black",  marginLeft:"60px",fontSize:"20px"}}> <strong   >Offer</strong> </p>


                                     <p style={{color:"black",  fontSize:"20px"}}> <strong   >  Cairo     <FlightTakeoffIcon></FlightTakeoffIcon>          </strong> </p>

                                     <p style={{color:"black",  fontSize:"20px"}}> <strong   >  Dahab    <FlightLandIcon></FlightLandIcon>          </strong> </p>
                                     <p style={{color:"black",  fontSize:"20px"}}> <strong   >  Starts from 200$               </strong> </p>
                                     
                                     
                                     
                                     </div> 


                                     </div>            
                     
                   
{/* <IconButton>

                      <Card style={{  filter : "brightness(60%) ",backgroundImage: `url("https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fc/ed/sharm-el-sheikh.jpg?w=700&h=500&s=1")` ,
                                 backgroundSize: "200px 200px" }} sx={{ maxWidth: 200 , maxHeight:200 }}>
      <CardContent   >
        <Typography  sx={{ fontSize: 17 }} color="white" gutterBottom>
            <FlightTakeoffIcon></FlightTakeoffIcon>
          cairo
        </Typography>
   

        <Typography sx={{ fontSize: 17 }} color="white" gutterBottom>
            <FlightLandIcon></FlightLandIcon>

          <strong>Sharm El sheikh </strong>
        </Typography>

        <Typography sx={{ fontSize: 17 }} color="white" gutterBottom>
           
          <strong>Start from 100$ </strong>
        </Typography>
       
        
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card> 

    </IconButton> */}

                     

                     
                     

                     





                    </div>

                    
                </div>

             </div>
            </body>

        )


    }



}

export default HomeGuest;