import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Component } from 'react';
import { Navbar, Nav, Container, NavLink } from 'react-bootstrap';
import './signUp.css'





class SignUp extends Component {

    constructor(props) {
        super(props);
        this.onChangeFirstName=this.onChangeFirstName.bind(this);
        this.onChangeLastName=this.onChangeLastName.bind(this);
        this.onChangeMail=this.onChangeMail.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onChangeRpassword=this.onChangeRpassword.bind(this);
        this.onChangePassport=this.onChangePassport.bind(this);
        this.onChangeDateOB=this.onChangeDateOB.bind(this);
        
        

        this.state = {
            
                FirstName:'',
                LastName:'',
                EMail:'',
                Password:'',
                Passport:'',
                DateOB:'',

            
            repeatPass:""

        };
    }


    onChangeFirstName(e) {
        this.setState({

           FirstName : e.target.value
        });

    }
    onChangeLastName(e) {
        this.setState({
            LastName: e.target.value
        });

    }
    onChangeMail(e) {
        this.setState({
            EMail: e.target.value
        });

    }
    onChangePassword(e) {
        this.setState({
            Password: e.target.value
        });

    }
    onChangeRpassword(e) {
        this.setState({
            repeatPass: e.target.value
        });

    }
    onChangeDateOB(e) {
        this.setState({
            DateOB: e.target.value
        });

    }
    onChangePassport(e) {
        this.setState({
            Passport: e.target.value
        });

    }

    submit(e){
        

    }

    render() {
        return (


            <div className="container-fluid bodySign ">
                <div className="row ">

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
                <div className="row">
                    <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
                        <div class="card card0 border-0">
                            <div class="row d-flex">
                                <div class="col-lg-6">
                                    <div class="card1 pb-5">
                                        <div class="row"> <strong className="offset-1 f "> Travel fast </strong></div>
                                        <div class="row"> <strong className="offset-3 f s2"> Travel easy </strong></div>
                                        <div class="row"> <strong className="offset-5 f s3"> Have fun </strong></div>
                                        <div class="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src="https://i.pinimg.com/564x/5a/d6/98/5ad698f9b62824195a1ec65bc67bb66e.jpg" style={{ height: 500 }} class="image" /> </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="card2 card border-0 px-4 py-5">

                                        <div class="offset-1 row px-4 mb-4">
                                            <div class="line"></div> <div class="line"></div>
                                        </div>

                                        <div class="row px-1">
                                            <div class="col-sm-6">

                                                <label class="mb-1 px-2">
                                                    <h6 class="mb-0 text-sm"> First Name *</h6>
                                                </label> <input class="col-sm-12 mb-4" type="text" name="name" placeholder="Enter your first name" />
                                            </div>
                                            <div class="col-sm-6">

                                                <label class="mb-1 px-2">
                                                    <h6 class="mb-0 text-sm"> Last Name *</h6>
                                                </label> <input class="col-sm-12 mb-4" type="text" name="name" placeholder="Enter your last name" />
                                            </div>
                                        </div>


                                        <div class="row px-3"> <label class="mb-1">
                                            <h6 class="mb-0 text-sm">Email Address *</h6>
                                        </label> <input class="mb-4" type="text" name="email" placeholder="Enter a valid email address" /> </div>
                                        <div class="row px-3"> <label class="mb-1">
                                            <h6 class="mb-0 text-sm">Password *</h6>
                                        </label> <input class="mb-4" type="password" name="password" placeholder="Enter password" /> </div>

                                        <div class="row px-3"> <label class="mb-1">
                                            <h6 class="mb-0 text-sm">Repeat Password *</h6>
                                        </label> <input class="mb-4" type="password" name="password" placeholder="Enter password" /> </div>

                                        <div class="row px-3"> <label class="mb-1">
                                            <h6 class="mb-0 text-sm">Passport Number *</h6>
                                        </label> <input class="mb-4" type="number" name="email" placeholder="Enter a valid email address" /> </div>
                                        
                                        <div class="row px-3"> <label class="mb-1">
                                            <h6 class="mb-0 text-sm">Date Of Birth *</h6>
                                        </label> <input class="mb-4" type="date" name="email" placeholder="Enter a valid email address" /> </div>
                                        
                                        <div class="row px-3">
                                        <h7 class="col-3">* Required</h7> 

                                        </div>

                                        <br />
                                        <div class="row mb-3 px-3"> <button type="submit" class="btn btn-dark text-center">Sign up </button></div>

                                    </div>
                                </div>
                            </div>
                            <div class="bg-dark py-4">
                                <div class="row px-3"> <small class="ml-4 ml-sm-5 mb-2">Copyright &copy; 2019. All rights reserved.</small>
                                    <div class="social-contact ml-4 ml-sm-auto"> <span class="fa fa-facebook mr-4 text-sm"></span> <span class="fa fa-google-plus mr-4 text-sm"></span> <span class="fa fa-linkedin mr-4 text-sm"></span> <span class="fa fa-twitter mr-4 mr-sm-5 text-sm"></span> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>





        )


    }



}

export default SignUp