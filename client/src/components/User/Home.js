import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Component } from 'react';
import { Button,Navbar, Nav, Container } from 'react-bootstrap';
import EditIcon from "@mui/icons-material/Edit"
import 'font-awesome/css/font-awesome.min.css';
import '../Flight.css';
import axios from 'axios';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {  CardActionArea, CardActions } from '@mui/material';



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Passport :'',
            FirstN : '',
            LastN : '',
        } 
        var x = {
            Email : localStorage.getItem("Email")
        }

        axios.post('http://localhost:8000/user/FindInfo',x)
        .then(res => {
            this.setState({Passport:res.data[0].Passportnumber}) ;
            this.setState({ FirstN : res.data[0].FirstName}) ;
            this.setState({ LastN : res.data[0].LastName}) ;
            console.log(res.data[0].Passportnumber)
            
        
        
        
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





                    <br />

                    <Card className = "card" sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          alt="green iguana"
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            First Name : {this.state.FirstN} 
          </Typography>
         
          <Typography gutterBottom variant="h5" component="div">
          Last Name : {this.state.LastN}
          </Typography>
          
          <Typography gutterBottom variant="h5" component="div">
            Email : {localStorage.getItem("Email")}
          </Typography>
          
          <Typography gutterBottom variant="h5" component="div">
            Passport Number : {this.state.Passport}
          </Typography>

          
          
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button href = '/user/Edit' size="small" className = "btn btn-dark" >
          Edit my Info <EditIcon></EditIcon>
        </Button>
      </CardActions>
    </Card>
                </div>


            </body>

        )


    }



}

export default Home;