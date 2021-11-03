
import './App.css';
import{ useState } from 'react' ;
import FlightAdd from './components/FlightAdd'
import {BrowserRouter as Router , Route} from 'react-router-dom'
//import axios from 'axios';
//import ReactDOM from "react-dom";





function App() {
  
  
    
  return (
    <div className="App">
      <Router>
        <div>
          
          <Route exact path='/' component={FlightAdd} />
          
        </div>
        </Router>
      
      
    </div>
  );
}

export default App;
