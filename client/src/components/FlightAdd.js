import './Flight.css';
import axios from 'axios';
import { Component } from 'react';
<link rel="stylesheet" href="https://unpkg.com/purecss@2.0.6/build/pure-min.css" integrity="sha384-Uu6IeWbM+gzNVXJcM9XV3SohHtmWE+3VGi496jvgX1jyvDTXfdK+rfZc8C1Aehk5" crossorigin="anonymous"></link>

class FlightAdd extends Component {
    constructor(props){
        super (props);
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

    this.state = {
        FlightNumber : '',
        toAir:'',
        fromAir:'',
        noEconomySeats : '',
        noBusinessSeats : '',
        noFirstSeats : '',
        depTime:'',
        arrTime:'',
        dateFlight: new Date(),
    }
    
    }

    onChangeID(e){
        this.setState({
            FlightNumber : e.target.value
        });

    }

    onChangetoAir(e){
        this.setState({
            toAir : e.target.value
        });

       

    }

    onChangefromAir(e){
        this.setState({
            fromAir : e.target.value
        });

    }

    onChangeDate(e){
        this.setState({
            dateFlight:e.target.value
        });
    }
    onChangeArrival(e){
        this.setState({
            arrTime:e.target.value
        })
    }

    onChangeDep(e){
        this.setState({
            depTime:e.target.value
        })
    }
    onChangeEcon(e){
        this.setState({
            noEconomySeats:e.target.value
        })

    }

    onChangeBusniess(e){
        this.setState({
            noBusinessSeats:e.target.value
        })

    }
    onChangeFirst(e){
        this.setState({
            noFirstSeats:e.target.value
        })

    }


    submit(e){
        e.preventDefault();
        const fl = {
            FlightNumber : this.state.FlightNumber,
            toAir:this.state.toAir,
            fromAir:this.state.fromAir,
            noEconomySeats:this.state.noEconomySeats,
            noFirstSeats:this.state.noFirstSeats,
            noBusinessSeats:this.state.noBusinessSeats,
            dateFlight:this.state.dateFlight,
            arrTime:this.state.arrTime,
            depTime:this.state.depTime,
        }

        
      
        axios.post('http://localhost:8000/Flight/find',{FlightNumber : this.state.FlightNumber})
          .then(res=> {
           
          
  if (res.data === 0){
        axios.post('http://localhost:8000/Flight/add',fl)
        .then(res => 
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
 
    render(){
       

        return (
            <div>
                <h1  >Create Flight</h1>
            <div className="Flight">
                
      <form className="pure-form pure-form-aligned"   onSubmit={this.submit}>
    <fieldset>
        <div className="pure-control-group" >
            <label htmlFor ="aligned-ID"  >Flight Number </label>
            <input type="number" min = '0' id="aligned-ID" required="true"  placeholder="ID" name ="id" value = {this.state.FlightNumber} onChange={this.onChangeID} />
        </div>
        <div className="pure-control-group" >
            <label htmlFor="aligned-toAir" >toAirport</label>
            <input type="text" id = "aligned-toAir" required="true" name ="toAir" value = {this.state.toAir} onChange={this.onChangetoAir} />
        </div>
        <div className="pure-control-group" >
            <label htmlFor="aligned-fromAir" >fromAirport</label>
            <input type="text" id = "aligned-fromAir" required="true" name ="from" value = {this.state.fromAir} onChange={this.onChangefromAir} />
        </div>
        <div className="pure-control-group" >
            <label htmlFor="aligned-econ" >Number of Economy class seats</label>
            <input type="number" min = '0' id = "aligned-econ" required="true" name ="econ"  value = {this.state.noEconomySeats} onChange={this.onChangeEcon} />
        </div>
        <div className="pure-control-group" >
            <label htmlFor="aligned-business" >Number of business class seats</label>
            <input type="number" min = '0' id = "aligned-business" required="true" name ="business"  value = {this.state.noBusinessSeats} onChange={this.onChangeBusniess} />
        </div>

        <div className="pure-control-group" >
            <label htmlFor="aligned-first" >Number of first class seats</label>
            <input type="number" min = '0' id = "aligned-first" required="true" name ="first"  value = {this.state.noFirstSeats} onChange={this.onChangeFirst} />
        </div>
        <div className="pure-control-group" >
            <label htmlFor="aligned-Arr" >Arrival time</label>
            <input type="time" id = "aligned-Arr" required="true" name ="arr"  value = {this.state.arrTime} onChange={this.onChangeArrival}  />
        </div>
        <div  className="pure-control-group" >
            <label htmlFor="aligned-Dep" >Departure time</label>
            <input type="time" id = "aligned-Dep" required="true" name ="dep" value = {this.state.depTime} onChange={this.onChangeDep}   />
        </div>
        <div className="pure-control-group" >
            <label htmlFor="aligned-Date" >Flight Date</label>
            <input type="date" id="aligned-Date" required="true" name ="dep" value = {this.state.dateFlight} onChange={this.onChangeDate}  />
        </div>
        <div className="pure-controls" >
           
            <button type="submit" className="pure-button pure-button-primary" >Add</button>
        </div>
    </fieldset>
</form>
      
    </div>
    </div>


        );
        
    }


}

export default FlightAdd ;