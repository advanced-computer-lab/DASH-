
import './NavBar.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Component} from 'react';
import { Link } from 'react-router-dom'





class NavBar extends Component{


    render(){
        return(
            
            <div>
                <h1 >Admin </h1>
                <h1>Home</h1>
                <div className="header" >
                <Link  to="/add" className="btn btn-primary">Create new flight </Link>
                <Link   to="/Search" className="btn btn-primary"> Search on a flight </Link>
                <Link   to="/getFlights" className="btn btn-primary">List & delete & edit all flights  </Link>
               </div>
              


            </div>

        )
    
    
    }



}

export default NavBar