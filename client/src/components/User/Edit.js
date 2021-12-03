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

        this.state = {
            FirstName: '',
            LastName: '',
            Email: '',
            Passportnumber: '',


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

    submit(e) {
        e.preventDefault();
        const fl = {
            UserMail: localStorage.getItem("Email"),
            Email: this.state.Email,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Passportnumber: this.state.Passportnumber
        }
        const ma = {
            Email: this.state.Email

        }
        axios.post('http://localhost:8000/user/FindEmail', ma)
            .then(res => {
                if (res.data == 0) {
                    console.log(localStorage.getItem("Email"));

                    axios.post('http://localhost:8000/user/EditUser', fl)
                        .then(res => {
                        }).catch((err) => {
                            alert("error happened")
                        })
                    window.location = 'http://localhost:3000/user/Edit';
                    alert("User Edited Successfuly")
                    localStorage.setItem("Email", fl.Email);

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
                                        <label htmlFor="aligned-ID"  >Passport Number </label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input className="form-control" type="text" value={this.state.Passportnumber} onChange={this.onChangePassport} />
                                    </div>
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