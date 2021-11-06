
import './App.css';
import FlightAdd from './components/FlightAdd'
import FlightGetAllFlights from './components/FlightGetAllFlights';
import NavBar from  './components/navBar';
import Search from  './components/search';
import EditFlight from './components/EditFlight';

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
          <Route exact path='/getFlights/editFlight:id' element = {<EditFlight/>} />

          </Routes>
        
        </Router>
      
      
    </div>
  );
}

export default App;
