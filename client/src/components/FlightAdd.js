import './Flight.css';
import axios from 'axios';
import { Component, useState,useEffect } from 'react';
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
        this.onChangeBusiness = this.onChangeBusiness.bind(this);
        this.onChangeFirst = this.onChangeFirst.bind(this);

    this.state = {
        flNumb : 0,
        toAir:"",
        fromAir:"",
        noEconomySeats:0,
        noBusinessSeats:0,
        noFirstSeats:0,
        depTime:"",
        arrTime:"",
        dateFlight: new Date()
    }
    }

    onChangeID(e){
        this.setState({
            flNumb : e.target.value
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

    onChangeBusiness(e){
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
            flNumb : this.state.flNumb,
            toAir:this.state.toAir,
           //fromAir:this.state.fromAir,
            //noEconomySeats:this.state.noEconomySeats,
            /*noBusinessSeats:this.state.noBusinessSeats,
            noFirstSeats:this.state.noFirstSeats,
            arrTime:this.state.arrTime,
            depTime:this.state.depTime,
            dateFlight:this.state.dateFlight*/
        }
        console.log(fl);

        axios.post('http://localhost:8000/Flight/add',fl)
        .then(res=> console.log(res.data))

        
    }
 
    render(){
       

        return (
            <div>
                <h1 >Create Flight</h1>
            <div className="Flight">
                
      <form class="pure-form pure-form-aligned"   onSubmit={this.submit}>
    <fieldset>
        <div class="pure-control-group" >
            <label for ="aligned-ID"  >ID </label>
            <input type="number" id="aligned-ID"  placeholder="ID" name ="id" value = {this.state.id} onChange={this.onChangeID} />
        </div>
        <div class="pure-control-group" >
            <label for="aligned-toAir" >toAirport</label>
            <input type="text" id = "aligned-toAir" name ="to" value = {this.state.toAir} onChange={this.onChangetoAir} />
        </div>
        <div class="pure-control-group" >
            <label for="aligned-fromAir" >fromAirport</label>
            <input type="text" id = "aligned-fromAir" name ="from" value = {this.state.fromAir} onChange={this.onChangefromAir} />
        </div>
        <div class="pure-control-group" >
            <label for="aligned-econ" >Number of Economy class seats</label>
            <input type="number" id = "aligned-econ" name ="econ" value = {this.state.noEconomySeats} onChange={this.onChangeEcon}  />
        </div>
        <div class="pure-control-group" >
            <label for="aligned-business" >Number of business class seats</label>
            <input type="number" id = "aligned-business" name ="business" value = {this.state.noBusinessSeats} onChange={this.onChangeBusiness}  />
        </div>

        <div class="pure-control-group" >
            <label for="aligned-first" >Number of first class seats</label>
            <input type="number" id = "aligned-first" name ="first" value = {this.state.noFirstSeats} onChange={this.onChangeID}   />
        </div>
        <div class="pure-control-group" >
            <label for="aligned-Arr" >Arrival time</label>
            <input type="time" id = "aligned-Arr" name ="arr"  value = {this.state.arrTime} onChange={this.onChangeArrival}  />
        </div>
        <div  class="pure-control-group" >
            <label for="aligned-Dep" >Departure time</label>
            <input type="time" id = "aligned-Dep" name ="dep" value = {this.state.depTime} onChange={this.onChangeDep}   />
        </div>
        <div class="pure-control-group" >
            <label for="aligned-Date" >Flight Date</label>
            <input type="date" id="aligned-Date" name ="dep" value = {this.state.dateFlight} onChange={this.onChangeDate}  />
        </div>
        <div class="pure-controls" >
           
            <button type="submit" class="pure-button pure-button-primary" >Add</button>
        </div>
    </fieldset>
</form>
      
    </div>
    </div>


        );
        
    }


}

export default FlightAdd ;