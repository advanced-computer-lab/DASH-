import './Flight.css';
import axios from 'axios';
import { Component } from 'react';
import { Navbar, Nav, Container, NavLink } from 'react-bootstrap';
<link rel="stylesheet" href="https://unpkg.com/purecss@2.0.6/build/pure-min.css" integrity="sha384-Uu6IeWbM+gzNVXJcM9XV3SohHtmWE+3VGi496jvgX1jyvDTXfdK+rfZc8C1Aehk5" crossorigin="anonymous"></link>

class FlightAdd extends Component {
    constructor(props) {
        super(props);
        this.onChangeID = this.onChangeID.bind(this);
        this.submit = this.submit.bind(this);
        this.onChangetoAir = this.onChangetoAir.bind(this);
        this.onChangefromAir = this.onChangefromAir.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeArrival = this.onChangeArrival.bind(this);
        this.onChangeDep = this.onChangeDep.bind(this);
        this.onChangeEcon = this.onChangeEcon.bind(this);
        this.onChangeBusniess = this.onChangeBusniess.bind(this);
        this.onChangeFirst = this.onChangeFirst.bind(this);
        this.onChangeBaggage = this.onChangeBaggage.bind(this);
        this.onChangePf = this.onChangePf.bind(this);
        this.onChangePe = this.onChangePe.bind(this);
        this.onChangePb = this.onChangePb.bind(this);
        this.onChangeType = this.onChangeType.bind(this);


        this.state = {
            FlightNumber: '',
            toAir: '',
            fromAir: '',
            noEconomySeats: '',
            noBusinessSeats: '',
            noFirstSeats: '',
            depTime: '',
            arrTime: '',
            dateFlight: new Date(),
            baggageallowance:'',
            pricebusiness:0,
            priceEconomy:0,
            priceFirst:0,
            Type:'',

        }

    }

    onChangeID(e) {
        this.setState({
            FlightNumber: e.target.value
        });

    }

    onChangetoAir(e) {
        this.setState({
            toAir: e.target.value
        });



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
    onChangeEcon(e) {
        this.setState({
            noEconomySeats: e.target.value
        })

    }

    onChangeBusniess(e) {
        this.setState({
            noBusinessSeats: e.target.value
        })

    }
    onChangeFirst(e) {
        this.setState({
            noFirstSeats: e.target.value
        })

    }

    onChangeFirst(e) {
        this.setState({
            noFirstSeats: e.target.value
        })

    }
    onChangeBaggage(e) {
        this.setState({
            baggageallowance: e.target.value
        })

    }
    onChangePb(e) {
        this.setState({ 
            pricebusiness: e.target.value
        })

    }
    onChangePf(e) {
        this.setState({
            priceFirst: e.target.value
        })

    }
    onChangePe(e) {
        this.setState({
            priceEconomy: e.target.value
        })

    }
    onChangeType(e) {
        this.setState({
            Type: e.target.value
        })

    }




    submit(e) {
        e.preventDefault();
        const fl = {
            FlightNumber: this.state.FlightNumber,
            toAir: this.state.toAir,
            fromAir: this.state.fromAir,
            noEconomySeats: this.state.noEconomySeats,
            noFirstSeats: this.state.noFirstSeats,
            noBusinessSeats: this.state.noBusinessSeats,
            dateFlight: this.state.dateFlight,
            arrTime: this.state.arrTime,
            depTime: this.state.depTime,
            baggageallowance:this.state.baggageallowance,
            pricebusiness:this.state.pricebusiness,
            priceFirst:this.state.priceFirst,
            priceEconomy:this.state.priceEconomy,
            Type:this.state.Type,


        }


        console.log(fl);
        axios.post('http://localhost:8000/Flight/find', { FlightNumber: this.state.FlightNumber })
            .then(res => {
                console.log(res.data);

                if (res.data === 0) {
                    axios.post('http://localhost:8000/Flight/add', fl)
                        .then(res => console.log(res.data),
                            window.location = '/',
                            alert("Flight Number added"),

                        )
                        .catch((error) => {
                            //s console.log(error.message)
                            // console.log("dareen");

                        });
                }
                else {
                    window.location = '/add';
                    alert("Flight Number already exist");
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
                                    <Nav.Link href="/"><i className="fa fa-home fa-lg"></i> Home</Nav.Link>
                                    <Nav.Link href="/add"><i class="fa fa-fighter-jet fa-lg"></i> Add flight </Nav.Link>
                                    <Nav.Link href="./search"><i class="fa fa-search fa-lg"></i> Search</Nav.Link>
                                    <Nav.Link href="/getFlights"><i class="fa fa-list fa-lg"></i> Flights List</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
                <br />
                <div className="row row-content">
                    <h2 className="text-center" >Create Flight</h2>
                    <div className="col-12 offset-md-3 col-md-6 "  >
                        <form className="search" onSubmit={this.submit}>
                            <fieldset>
                                <br />
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-ID"  >Flight Number </label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input className="form-control" type="number" id="aligned-ID" required="true" name="id" placeholder="Flight Number" value={this.state.FlightNumber} onChange={this.onChangeID} />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-toAir" >Arrival Terminal</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input className="form-control" type="text" id="aligned-toAir" required="true" name="toAir" placeholder="Arrival Airport" value={this.state.toAir} onChange={this.onChangetoAir} />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-fromAir" >Departure Terminal</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input className="form-control" type="text" id="aligned-fromAir" required="true" name="from" placeholder="Departure Airport" value={this.state.fromAir} onChange={this.onChangefromAir} />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-econ" >Number of Economy class seats</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input type="number" className="form-control" id="aligned-econ" required="true" name="econ" placeholder="Economy Class Seats" value={this.state.noEconomySeats} onChange={this.onChangeEcon} />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-business" >Number of business class seats</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input type="number" className="form-control" id="aligned-business" required="true" name="business" placeholder="Business Class Seats" value={this.state.noBusinessSeats} onChange={this.onChangeBusniess} />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-first" >Number of first class seats</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input type="number" className="form-control" id="aligned-first" required="true" name="first" placeholder="First Class Seats" value={this.state.noFirstSeats} onChange={this.onChangeFirst} />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">

                                        <label htmlFor="aligned-Arr" >Arrival time</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input type="datetime-local" className="form-control" id="aligned-Arr" required="true" name="arr" placeholder="Arrival Time" value={this.state.arrTime} onChange={this.onChangeArrival} />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-Dep" >Departure time</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input type="datetime-local" className="form-control" id="aligned-Dep" required="true" name="dep" value={this.state.depTime} placeholder="Departure Time" onChange={this.onChangeDep} />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-Dep" >Baggage Allowance</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input type="number" className="form-control" id="aligned-Dep" required="true" name="dep" value={this.state.baggageallowance} placeholder="Baggage Allowance" onChange={this.onChangeBaggage} />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-Dep" >Economy seat price</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input type="number" className="form-control" id="aligned-Dep" required="true" name="dep" value={this.state.priceEconomy} placeholder="Price" onChange={this.onChangePe} />
                                    </div>
                                </div>

                                <br />
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-Dep" >First class seat price</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input type="number" className="form-control" id="aligned-Dep" required="true" name="dep" value={this.state.priceFirst} placeholder="Price" onChange={this.onChangePf} />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-Dep" >Business class seat price</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input type="number" className="form-control" id="aligned-Dep" required="true" name="dep" value={this.state.pricebusiness} placeholder="Price" onChange={this.onChangePb} />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row" >
                                    <div className="col-12 col-sm-4">
                                        <label htmlFor="aligned-Dep" >Type</label>
                                    </div>
                                    <div className="col-12 col-sm-8">
                                        <input type="text" className="form-control" id="aligned-Dep" required="true" name="dep" value={this.state.Type} placeholder="Departure/Return" onChange={this.onChangeType} />
                                    </div>
                                </div>

                                <br />

                                <br />
                                <div className="form-group row" >
                                    <div className="offset-sm-4 col-12 col-sm-6 ">
                                        <button type="submit" className="btn btn-dark form-control" >Add</button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>

                    </div>
                </div>
            </div>

        );

    }


}

export default FlightAdd;