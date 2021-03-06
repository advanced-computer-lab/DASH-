import '../Flight.css';
import axios from 'axios';
import { Component } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
//popper.js/dist/umd/popper.min.js
import "bootstrap/dist/css/bootstrap.min.css";
//import "react/popper";
import { Navbar, Nav, Container } from 'react-bootstrap';



<link rel="stylesheet" href="https://unpkg.com/purecss@2.0.6/build/pure-min.css" integrity="sha384-Uu6IeWbM+gzNVXJcM9XV3SohHtmWE+3VGi496jvgX1jyvDTXfdK+rfZc8C1Aehk5" crossorigin="anonymous"></link>

const Flight = (props) => (
    <tr >
        <td>{props.flight.FlightNumber}</td>
        <td>{props.flight.toAir}</td>
        <td>{props.flight.fromAir}</td>
        <td>{props.flight.noEconomySeats}</td>
        <td>{props.flight.noBusinessSeats}</td>
        <td>{props.flight.noFirstSeats}</td>
        <td>{props.flight.depTime}</td>
        <td>{props.flight.arrTime}</td>


        <td>
            <IconButton onClick={() => { props.deleteFlight(props.flight.FlightNumber) }}><DeleteForeverIcon style={{ color: "white" }}></DeleteForeverIcon></IconButton>
            <IconButton onClick={() => {
                window.location = "http://localhost:3000/getFlights/editFlight" +
                    props.flight.FlightNumber + " " +
                    props.flight.toAir + " " +
                    props.flight.fromAir + " " +
                    props.flight.noEconomySeats + " " +
                    props.flight.noBusinessSeats + " " +
                    props.flight.noFirstSeats + " " +
                    props.flight.depTime + " " +
                    props.flight.arrTime + " "



            }}  ><EditIcon style={{ color: "white" }}></EditIcon></IconButton>
        </td>

    </tr>
)
class Search extends Component {
    constructor(props) {
        super(props);

        this.submit = this.submit.bind(this);
        this.onChangeN = this.onChangeN.bind(this);
        this.deleteFlight = this.deleteFlight.bind(this);
        this.onChangetoAir = this.onChangetoAir.bind(this);
        this.onChangefromAir = this.onChangefromAir.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeArrival = this.onChangeArrival.bind(this);
        this.onChangeDep = this.onChangeDep.bind(this);
        this.state = {
            FlightNumber: '',
            toAir: '',
            fromAir: '',
            depTime: '',
            arrTime: '',
            flights: [],
        }
        axios.get("http://localhost:8000/user/isAuth", {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            }
        }).then(res => {
            if (res.data == "Token is not valid") {
                alert("Token Expired LogIn Again");
                window.location = "/logIn";
            } 
        })
    }

    submit(e) {

        e.preventDefault();
        this.flightsList();





    }

    onChangeN(e) {
        this.setState({ FlightNumber: e.target.value })
    }
    onChangetoAir(e) {
        this.setState({ toAir: e.target.value })
    }
    onChangefromAir(e) {
        this.setState({
            fromAir: e.target.value
        });

    }

    onChangeDate(e) {
        this.setState({
            dateFlight: e.target.value
        });
    }
    onChangeArrival(e) {
        this.setState({
            arrTime: e.target.value
        })
    }

    onChangeDep(e) {
        this.setState({
            depTime: e.target.value
        })
    }

    flightsList() {
        const f = {
            FlightNumber: this.state.FlightNumber,
            toAir: this.state.toAir,
            fromAir: this.state.fromAir,
            dateFlight: this.state.dateFlight,
            arrTime: this.state.arrTime,
            depTime: this.state.depTime,
            AvailE: "",
            AvailB: "",
            AvailF: "",
            PriceFrom: "",
            PriceTo: "",

        }


        axios.post('http://localhost:8000/Flight/FindFlight', f,{
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        })
            .then(res => {
                if(res.data =="Token is not valid"){
                    alert("Token expired log in again please");
                    window.location="/logIn";
                }else{

                    this.setState({ flights: res.data })
                }


            })


    }
    deleteFlight(FlightNumber) {
        if (window.confirm('Are you sure you want to delete this Flight from the database')) {
            // Save it!
            axios.post("http://localhost:8000/Flight/deleteFlight", { data: FlightNumber },{
                headers: {
                    "x-auth-token": localStorage.getItem("token")
                }
            }).then(
                res => {
                    if(res.data =="Token is not valid"){
                        alert("Token expired log in again please");
                        window.location="/logIn";
                    }
                }
            ).catch(err => { console.log(err) });
            this.setState({
                flights: this.state.flights.filter(element => element.FlightNumber !== FlightNumber)
            })
        } else {
            // Do nothing!

        }



    }

    test() {
        return (this.state.flights.map(currentFlight => {
            return <Flight flight={currentFlight} deleteFlight={this.deleteFlight} />
        }))


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
                                    <Nav.Link href="/"><i className="fa fa-home fa-lg"></i> Home</Nav.Link>
                                    <Nav.Link href="/add"><i class="fa fa-fighter-jet fa-lg"></i> Add flight </Nav.Link>
                                    <Nav.Link href="./search"><i class="fa fa-search fa-lg"></i> Search</Nav.Link>
                                    <Nav.Link href="/getFlights"><i class="fa fa-list fa-lg"></i> Flights List</Nav.Link>

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

                <div className="row row-content">

                    <div className="col-12 col-md-6">


                        <form className="search" onSubmit={this.submit}>

                            <div className="form-group row">
                                <div className="col-6 col-md-3">
                                    <label htmlFor="aligned-ID"  >Flight Number </label>
                                    &nbsp;&nbsp;
                                </div>
                                <div className="col-12 col-md-9">
                                    <input type="number" min = '0' id="aligned-ID" placeholder="Flight Number" name="id" className="form-control" value={this.state.FlightNumber} onChange={this.onChangeN} />
                                    &nbsp;&nbsp;
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-6 col-md-3" >
                                    <label htmlFor="aligned-toAir" >Arrival Airport</label>
                                    &nbsp;&nbsp;

                                </div>

                                <div className="col-12 col-md-9">
                                    <input type="text" placeholder="to" name="id" className="form-control" value={this.state.toAir} onChange={this.onChangetoAir} />

                                    &nbsp;&nbsp;
                                </div>
                            </div>


                            <div className="form-group row">
                                <div className="col-6 col-md-3">
                                    <label htmlFor="aligned-fromAir" >Departure Airport</label>
                                    &nbsp;&nbsp;
                                </div>
                                <div className="col-12 col-md-9">
                                    <input className="form-control" type="text" placeholder="from" id="aligned-fromAir" name="from" value={this.state.fromAir} onChange={this.onChangefromAir} />
                                    &nbsp;&nbsp;
                                </div>
                            </div>

                            <div className="form-group row">

                                <div className="col-6 col-md-3">

                                    <label htmlFor="aligned-Arr"> Arrival time</label>
                                    &nbsp;&nbsp;

                                </div>
                                <div className="col-12 col-md-9">
                                    <input className="form-control" type="datetime-local" id="aligned-Arr" name="arr" value={this.state.arrTime} onChange={this.onChangeArrival} />
                                    &nbsp;&nbsp;
                                </div>
                            </div>


                            <div className="form-group row">

                                <div className="col-6 col-md-3">
                                    <label htmlFor="aligned-Dep" >Departure time</label>
                                    &nbsp;&nbsp;
                                </div>
                                <div className="col-12 col-md-9">
                                    <input className="form-control" type="datetime-local" id="aligned-Dep" name="dep" value={this.state.depTime} onChange={this.onChangeDep} />
                                    &nbsp;&nbsp;
                                </div>
                            </div>


                            <div className="form-group row">
                                <div className="offset-md-3 col-9 col-md-5" >
                                    <button className=" btn btn-dark form-control" type="submit">Search</button>
                                </div>
                            </div>

                        </form>
                        <br />
                    </div>

                    <div className="row row-header ">

                        <div className="col-12 ">

                            <table className="table table-dark d-felx">
                                <thead>
                                    <tr>
                                        <th>Flight Number</th>
                                        <th>Arrival</th>
                                        <th>Departure</th>
                                        <th>Economy Seats</th>
                                        <th>Business Seats</th>
                                        <th>First Class Seats</th>
                                        <th>Departure Time</th>
                                        <th>Arrival Time</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.test()}

                                </tbody>
                            </table>

                        </div>



                    </div>



                </div>

            </div>
        );



    }



}

export default Search;