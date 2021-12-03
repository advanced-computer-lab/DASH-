import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './signUp.css'





class SignUp extends Component {

    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeMail = this.onChangeMail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRpassword = this.onChangeRpassword.bind(this);
        this.onChangePassport = this.onChangePassport.bind(this);
        this.onChangeDateOB = this.onChangeDateOB.bind(this);
        this.submit = this.submit.bind(this);


        this.state = {

            FirstName: '',
            LastName: '',
            EMail: '',
            Password: '',
            Passport: '',
            DateOB: '',


            repeatPass: ""

        };
    }


    onChangeFirstName(e) {
        this.setState({

            FirstName: e.target.value
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

    submit(e) { 
        e.preventDefault();
        const user = {
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Password: this.state.Password,
            Email: this.state.EMail,
            Passportnumber: this.state.Passport,
            Type: true ,
            DateOB: this.state.DateOB,
        };
        // console.log(this.state.Password, "::::", this.state.repeatPass);


        //console.log(this.state.FirstName);

        const ma = {
            Email: this.state.EMail

        }
        axios.post('http://localhost:8000/user/FindEmail', ma)
        .then(res => {
            console.log(res.data)
            if (res.data == 0) {
                axios.post('http://localhost:8000/user/register', user)
            .then((res) =>alert(res.data),
               window.location = '/login',


            ).catch((err1) => {
                alert("error happened");
                window.location = "/";

            })

            }
            else {
                alert("email is already exists choose another one")
                window.location = '/sign';
            }




        })


        


        //console.log(user);


    }



    render() {
        return (


            <div className="container-fluid bodySign ">
               
                <div className="row">
                    <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
                        <div className="card card0 border-0">
                            <div className="row d-flex">
                                <div className="col-lg-6">
                                    <div className="card1 pb-5">
                                        <div className="row"> <strong className="offset-1 f "> Travel fast </strong></div>
                                        <div className="row"> <strong className="offset-3 f s2"> Travel easy </strong></div>
                                        <div className="row"> <strong className="offset-5 f s3"> Have fun </strong></div>
                                        <div className="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src="https://i.pinimg.com/564x/5a/d6/98/5ad698f9b62824195a1ec65bc67bb66e.jpg" style={{ height: 500 }} className="image" alt="Travel" /> </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <form onSubmit={this.submit}>
                                        <div className="card2 card border-0 px-4 py-5">

                                            <div className="offset-1 row px-4 mb-4">
                                                <div className="line"></div> <div className="line"></div>
                                            </div>

                                            <div className="row px-1">

                                                <div className="col-sm-6">

                                                    <label className="mb-1 px-2">
                                                        <h6 className="mb-0 text-sm"> First Name *</h6>
                                                    </label> <input required="true" className="col-sm-12 mb-4" type="text" name="name" placeholder="Enter your first name" value={this.state.FirstName} onChange={this.onChangeFirstName} />
                                                </div>
                                                <div className="col-sm-6">

                                                    <label className="mb-1 px-2">
                                                        <h6 className="mb-0 text-sm"> Last Name *</h6>
                                                    </label> <input required="true" className="col-sm-12 mb-4" type="text" name="name" placeholder="Enter your last name" value={this.state.LastName} onChange={this.onChangeLastName} />
                                                </div>
                                            </div>


                                            <div className="row px-3"> <label className="mb-1">
                                                <h6 className="mb-0 text-sm">Email Address *</h6>
                                            </label> <input className="mb-4" required="true" type="text" name="email" placeholder="Enter a valid email address" value={this.state.EMail} onChange={this.onChangeMail} /> </div>
                                            <div className="row px-3"> <label className="mb-1">
                                                <h6 className="mb-0 text-sm">Password *</h6>
                                            </label> <input className="mb-4" required="true" type="password" name="password" placeholder="Enter password" value={this.state.Password} onChange={this.onChangePassword} /> </div>

                                            <div className="row px-3"> <label className="mb-1">
                                                <h6 className="mb-0 text-sm">Repeat Password *</h6>
                                            </label> <input className="mb-4" type="password" required="true" name="password" placeholder="Enter password" value={this.state.repeatPass} onChange={this.onChangeRpassword} /> </div>

                                            <div className="row px-3"> <label className="mb-1">
                                                <h6 className="mb-0 text-sm">Passport Number *</h6>
                                            </label> <input className="mb-4" type="number" required="true" name="email" placeholder="Enter a valid email address" value={this.state.Passport} onChange={this.onChangePassport} />  </div>

                                            <div className="row px-3"> <label className="mb-1">
                                                <h6 className="mb-0 text-sm">Date Of Birth *</h6>
                                            </label> <input className="mb-4" type="date" name="email" required="true" placeholder="Enter a valid email address" value={this.state.DateOB} onChange={this.onChangeDateOB} /> </div>

                                            <div className="row px-3">
                                                <h7 className="col-3">* Required</h7>

                                            </div>

                                            <br />
                                            <div className="row mb-3 px-3"> <button type="submit" className="btn btn-dark text-center" >Sign up </button></div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="bg-dark py-4">
                                <div className="row px-3"> <small className="ml-4 ml-sm-5 mb-2">DASH-TEAM &copy; 2019. All rights reserved.</small>
                                    <div className="social-contact ml-4 ml-sm-auto"> <span className="fa fa-facebook mr-4 text-sm"></span> <span className="fa fa-google-plus mr-4 text-sm"></span> <span class="fa fa-linkedin mr-4 text-sm"></span> <span class="fa fa-twitter mr-4 mr-sm-5 text-sm"></span> </div>
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