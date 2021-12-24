import axios from 'axios';

import EditIcon from "@mui/icons-material/Edit";
import { Navbar, Nav, Container } from 'react-bootstrap';
const { Component } = require("react");



class Edit extends Component {
    constructor(props) {
        super(props);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangePassport = this.onChangePassport.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.submit = this.submit.bind(this);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeCountryCode = this.onChangeCountryCode.bind(this);
        this.onChangeTelephone = this.onChangeTelephone.bind(this);


        this.state = {
            FirstName: '',
            LastName: '',
            Email: '',
            Username: '',
            Passportnumber: '',

            Telephone: '',
            Address: '',
            CountryCode: '',


            Telephone: '',
            Address: '',
            CountryCode: '',


        };
    }
    onChangeFirstname(e) {
        this.setState({
            FirstName: e.target.value
        });
    }
    onChangeLastname(e) {
        this.setState({
            LastName: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            Email: e.target.value
        });
    }
    onChangePassport(e) {
        this.setState({
            Passportnumber: e.target.value
        });
    }


    onChangeTelephone(e) {
        this.setState({
            Telephone: e.target.value
        });

    }

    onChangeCountryCode(e) {
        this.setState({
            CountryCode: e.target.value
        });

    }

    onChangeAddress(e) {
        this.setState({
            Address: e.target.value
        });

    }
    onChangeUsername(e) {
        this.setState({
            Username: e.target.value
        });

    }

    submit(e) {
        e.preventDefault();
        const fl = {
            UserMail: localStorage.getItem("Email"),
            Email: this.state.Email,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Passportnumber: this.state.Passportnumber,
            Username: this.state.Username,

            Telephone: this.state.Telephone,
            Address: this.state.Address,
            CountryCode: this.state.CountryCode,
        }
        const ma = {
            Email: this.state.Email

        }

        const us = {
            Username: this.state.Username

        }

        axios.post('http://localhost:8000/user/FindUsername', us)
            .then(res => {
                console.log(res.data)
                if (res.data != 0) {
                    alert("User Name already exists choose another one")
                    window.location = '/sign';
                    return
                }
            })


        axios.post('http://localhost:8000/user/FindEmail', ma)
            .then(res => {
                if (res.data == 0) {
                    console.log(localStorage.getItem("Email"));

                    axios.post('http://localhost:8000/user/EditUser', fl)
                        .then(res => {
                            alert(localStorage.getItem("Email"))
                            
                            
                        }).catch((err) => {
                            alert("error happened")
                        })

                        if (fl.Email.length !=0){
                            
                            localStorage.removeItem("Email")
                            localStorage.setItem("Email", fl.Email);
                            }
                  
                    window.location = 'http://localhost:3000/user/Edit';
                    alert("User Edited Successfuly")
                   

                    // window.location = '/user/home';
                }
                else {
                    alert("email is already exists choose another one")
                    window.location = 'http://localhost:3000/user/Edit';
                }
            })



    }






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

                <div className="row row-content">
                    <div className="col-12 offset-md-3 col-md-6  ">
                        <form className="Edit" onSubmit={this.submit}>
                            <fieldset>
                                <br />
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-ID"  >First Name </label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input className="form-control" type="text" value={this.state.FirstName} onChange={this.onChangeFirstname} />
                                    </div>
                                </div>

                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-ID"  >Last Name </label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input className="form-control" type="text" value={this.state.LastName} onChange={this.onChangeLastname} />
                                    </div>
                                </div>



                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-ID"  >User Name </label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input className="form-control" type="text" value={this.state.Username} onChange={this.onChangeUsername} />
                                    </div>
                                </div>


                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-ID"  >Passport Number </label>
                                    </div>


                                    <div className="col-12 col-sm-8">
                                        <input className="form-control" type="text" value={this.state.Passportnumber} onChange={this.onChangePassport} />
                                    </div>


                                </div>

                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-ID">Country Code</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input className="form-control" ype="number" name="Country Code" value={this.state.CountryCode} onChange={this.onChangeCountryCode} />                                            </div>
                                </div>


                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-ID">Telephone</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input className="form-control" ype="number" name="Telephone" value={this.state.Telephone} onChange={this.onChangeTelephone} />                                            </div>
                                </div>

                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-ID">Home Address</label>
                                    </div>

                                    <div className="col-12 col-sm-8">
                                        <textarea className="form-control" type="text" name="Home Address" value={this.state.Address} onChange={this.onChangeAddress} />                                            </div>

                                </div>


                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-ID"  >Email </label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input className="form-control" type="text" value={this.state.Email} onChange={this.onChangeEmail} />
                                    </div>
                                </div>

                                <br />
                                <br />
                                <br />
                                
                                <div className="form-group row" >
                                    <div className="offset-sm-4 col-12 col-sm-6 ">
                                        <button type="submit" className="btn btn-dark form-control" >Edit</button>
                                    </div>
                                </div>

                            </fieldset>
                        </form>




                    </div>
                </div>
            </div>


        )
    }

}


export default Edit;