import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Component } from 'react';
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import EditIcon from "@mui/icons-material/Edit"
import 'font-awesome/css/font-awesome.min.css';
import '../Flight.css';
import axios from 'axios';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import CLOUDS from 'vanta/dist/vanta.clouds.min'

import * as THREE from 'three'





const styles = {
  media: {
    objectFit: 'cover',

  }
};

class Home extends Component {


  constructor(props) {
    super(props);
    this.vantaRef = React.createRef()

    this.state = {
      Passport: '',
      FirstN: '',
      LastN: '',
      UserName: '',
    }
    var x = {
      Email: localStorage.getItem("Email")
    }

    axios.post('http://localhost:8000/user/FindInfo', x,
      {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      })
      .then(res => {
        if (res.data == "Token is not valid") {
          alert("Token Expired LogIn Again");
          window.location = "/logIn";
        } else {
          this.setState({ Passport: res.data[0].Passportnumber });
          this.setState({ FirstN: res.data[0].FirstName });
          this.setState({ LastN: res.data[0].LastName });
          this.setState({ UserName: res.data[0].Username });
          console.log(res.data[0].Passportnumber)

        }




      })





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


      <body  >
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"></script>

        <div ref={this.vantaRef}  >

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
          </div>





          <br />

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "90vh" }} >

            <Card style={{ borderRadius: "10px", backgroundColor: 'rgba(255,255,255,0.5)' }} sx={{ maxWidth: 300 }}>
              <CardActionArea >
                <CardMedia
                  component="img"
                  style={{ marginLeft: "50px", height: "200px", width: "200px" }}
                  image="https://devshift.biz/wp-content/uploads/2017/04/profile-icon-png-898-450x450.png"




                />
                <CardContent >
                  <Typography gutterBottom variant="h6" component="div">
                    Username: {this.state.UserName}
                  </Typography>

                  <Typography style={{ wordWrap: "break-word" }} gutterBottom variant="h6" component="p">
                    {localStorage.getItem("Email")}
                  </Typography>

                  <Typography gutterBottom variant="h6" component="div">
                    Passport Number: {this.state.Passport}
                  </Typography>



                </CardContent>
              </CardActionArea>
              <CardActions >
                <Button href='/user/Edit' size="sm" className="btn btn-dark" >
                  Edit my Info <EditIcon></EditIcon>
                </Button>
                <br />
                <Button href='/user/ChangePassword' size="sm" className="btn btn-dark" >Change Pass<EditIcon></EditIcon>
                </Button>
              </CardActions>
            </Card>

          </div>

          <Card className="card" sx={{ maxWidth: 400 }}>
            <CardActionArea >
              <CardMedia
                component="img"
                height="150"
                image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"


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



              </CardContent >
            </CardActionArea >
            <CardActions>
              <Button href='/user/Edit' size="small" className="btn btn-dark" >
                Edit my Info <EditIcon></EditIcon>
              </Button>
              <br />
              <Button href='/user/ChangePassword' size="small" className="btn btn-dark" >Change Pass<EditIcon></EditIcon>
              </Button>
            </CardActions>
          </Card >

        </div >








      </body >

    )


  }



}

export default Home;