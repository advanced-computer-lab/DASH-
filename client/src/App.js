
import './App.css';
import FlightAdd from './components/FlightAdd'
import FlightGetAllFlights from './components/FlightGetAllFlights';
import NavBar from  './components/NavBar';
import Search from  './components/Search';

import {BrowserRouter as Router,Routes , Route} from 'react-router-dom'
//import axios from 'axios';
//import ReactDOM from "react-dom";





function App() {
  
  
    
  return (
    <div className="App">
      <Router>

        <Routes>
          
          <Route exact path='/add' element={<FlightAdd />} />
          <Route exact path='/getFlights' element = {<FlightGetAllFlights/>} />
          <Route exact path='/' element = {<NavBar/>} />
          <Route exact path='/search' element = {<Search/>} />

          </Routes>
        
        </Router>
      
      
    </div>
  );
}

export default App;
