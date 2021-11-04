import './Flight.css';
import axios from 'axios';
import React, { Component, useState,useEffect } from 'react';
<link rel="stylesheet" href="https://unpkg.com/purecss@2.0.6/build/pure-min.css" integrity="sha384-Uu6IeWbM+gzNVXJcM9XV3SohHtmWE+3VGi496jvgX1jyvDTXfdK+rfZc8C1Aehk5" crossorigin="anonymous"></link>


const mongoose = require('mongoose');

const MongoURI = 'mongodb+srv://dash_hamada:Adhom_Shosho_Dodo_Hamada@dashcluster.yrwpn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' ;

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

function Test()
{
    console.log(mongoose.get);
    axios.get();
    const [list, setList] = useState([]);
    const [flag, setFlag] = useState(false);

}



class FlightSearch extends Component {
    
    
    
    submit(e){
        e.preventDefault();
        
        const instance = axios.create({
            baseURL: 'https://some-domain.com/api/',
            timeout: 1000,
            headers: {
                'X-Custom-Header': 'foobar'
            }
        });
        
        const article = { title: 'React POST Request Example' };

        axios.post("/Search",article);

        console.log("I ❤ Shazzaa 222");
          
        
    }
 
    render(){
       
      

        return (
            <form class="pure-form pure-form-aligned" onSubmit={this.submit} method = "post">

            <div>
                <h1>Search for Flight</h1>
           
            <div className="Flight">
                
            <label for ="aligned-ID" >Flight ID </label>
            <input type="number"  id="aligned-ID"  placeholder="ID"  />
            <button class="pure-button pure-button-primary">Search</button>
      
    </div>
    </div>
            </form>
        
        );

    }


}

export default FlightSearch;