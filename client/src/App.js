import './App.css';
import{ useState } from 'react' ;
import FlightAdd from './components/FlightAdd'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
//import axios from 'axios';
//import ReactDOM from "react-dom";





function App() {
  
  
    
  return (
    <div className="App">
      <Router>
        <Routes>
          
          <Route exact path='/' element={<FlightAdd />} />
          
        </Routes>
        </Router>
      
      
    </div>
  );
}

export default App