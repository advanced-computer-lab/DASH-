import './Flight.css';
import axios from 'axios';
import { Component, useState,useEffect } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
<link rel="stylesheet" href="https://unpkg.com/purecss@2.0.6/build/pure-min.css" integrity="sha384-Uu6IeWbM+gzNVXJcM9XV3SohHtmWE+3VGi496jvgX1jyvDTXfdK+rfZc8C1Aehk5" crossorigin="anonymous"></link>

const Flight = (props)=>(
    <tr >
        <td>{props.flight.FlightNumber}</td>
        <td>{props.flight.toAir}</td>
        <td>{props.flight.fromAir}</td>
        <td>{props.flight.noEconomySeats}</td>
        <td>{props.flight.noBusinessSeats}</td>
        <td>{props.flight.noFirstSeats}</td>
        <td>{props.flight.depTime}</td>
        <td>{props.flight.arrTime}</td>
        <td>{props.flight.dateFlight}</td>
        
        <td> 
        <IconButton onClick={()=>{ props.deleteFlight(props.flight.FlightNumber)  }}><DeleteForeverIcon style={{color:"white"}}></DeleteForeverIcon></IconButton>
              </td>

    </tr>
)
class Search extends Component {
    constructor(props){
        super (props);

        this.submit = this.submit.bind(this);
        this.onChangeN = this.onChangeN.bind(this);
        this.deleteFlight= this.deleteFlight.bind(this);
        this.onChangetoAir = this.onChangetoAir.bind(this);
        this.onChangefromAir = this.onChangefromAir.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeArrival = this.onChangeArrival.bind(this);
        this.onChangeDep = this.onChangeDep.bind(this);
    this.state = {
        FlightNumber : '',
        toAir:'',
        fromAir:'',
        depTime:'',
        arrTime:'',
        dateFlight: new Date(),
       flights: [] ,
    }
    }
    
submit(e){
    
    e.preventDefault();
   this.flightsList();
    
   



    }

onChangeN(e){
    this.setState({FlightNumber : e.target.value})
}
onChangetoAir(e){
    this.setState({toAir : e.target.value})
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

flightsList(){
    const f = {
        FlightNumber : this.state.FlightNumber,
            toAir:this.state.toAir,
            fromAir:this.state.fromAir,
            dateFlight:this.state.dateFlight,
            arrTime:this.state.arrTime,
            depTime:this.state.depTime,
        
    }
    
    console.log(f);
    axios.post('http://localhost:8000/Flight/FindFlight' , f)
    .then(res =>{ 
        this.setState({flights:res.data})
        
        
         })
         
   
}
deleteFlight(FlightNumber){
    if (window.confirm('Are you sure you want to delete this Flight from the database')) {
        // Save it!
        axios.post("http://localhost:8000/Flight/deleteFlight",{ data: FlightNumber}).then(
        res=>(console.log(res.data))
    ).catch(err=>{console.log(err )});
    this.setState({
        flights:this.state.flights.filter(element=>element.FlightNumber !== FlightNumber)
    })
      } else {
        // Do nothing!
       
      }
    
    
    
}

test(){
    return( this.state.flights.map(currentFlight=>{
        return <Flight flight={currentFlight} deleteFlight = {this.deleteFlight} />
    }) )

    console.log(this.state.flights);
}
   
render(){

    return(
       <div>
            <form onSubmit={this.submit}>
                
            <input type="number" id="aligned-ID"  placeholder="ID" name ="id" value={this.state.FlightNumber}  onChange={this.onChangeN} />
            <input type="text"  name ="id" value={this.state.toAir}  onChange={this.onChangetoAir} />
            <input type="text" id = "aligned-fromAir"  name ="from" value = {this.state.fromAir} onChange={this.onChangefromAir} />
            <input type="time" id = "aligned-Arr"  name ="arr"  value = {this.state.arrTime} onChange={this.onChangeArrival}  />
            <input type="time" id = "aligned-Dep"  name ="dep" value = {this.state.depTime} onChange={this.onChangeDep}   />
            <input type="date" id="aligned-Date" name ="dep" value = {this.state.dateFlight} onChange={this.onChangeDate}  />

                <button type="submit">Search</button>
            </form>
            <div className="row row-header ">

                    <div className="col-12 ">

                        <table className="table table-dark d-felx">
                            <thead >
                                <tr >
                                    <th>Flight Number</th>
                                    <th>Arrival</th>
                                    <th>Departure</th>
                                    <th>Economy Seats</th>
                                    <th>Business Seats</th>
                                    <th>First Class Seats</th>
                                    <th>Departure Time</th>
                                    <th>Arrival Time</th>
                                    <th>Date Of Flight</th>
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
        );
        
        
    
}
    


}

export default Search ;