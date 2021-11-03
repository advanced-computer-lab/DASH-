import React , {Component} from 'react' ;
import axios from 'axios';

class FlightAdd extends Component {

    submit(e){
        e.preventDefault();
        const fl = {
            id : document.getElementById("id")
        }
        console.log(fl);
    }
 
    render(){

        return (
            <div className="">
      <form  onSubmit={this.submit}>
    <fieldset>
        <div >
            <label >ID</label>
            <input type="number" id="id"  placeholder="ID" name ="id" />
        </div>
        <div >
            <label >toAirport</label>
            <input type="text" name ="to"  />
        </div>
        <div >
            <label >fromAirport</label>
            <input type="text" name ="from"  />
        </div>
        <div >
            <label >Number of Economy class seats</label>
            <input type="number" name ="econ"  />
        </div>
        <div >
            <label >Number of business class seats</label>
            <input type="number" name ="business"  />
        </div>

        <div >
            <label >Number of first class seats</label>
            <input type="number" name ="first"  />
        </div>
        <div >
            <label >Arrival time</label>
            <input type="text" name ="arr"  />
        </div>
        <div >
            <label >Departure time</label>
            <input type="text" name ="dep"  />
        </div>
        <div >
            <label >Flight Date</label>
            <input type="date" name ="dep"  />
        </div>
        <div >
           
            <button type="submit" >Add</button>
        </div>
    </fieldset>
</form>
      
    </div>


        );
        
    }


}

export default FlightAdd ;