import logo from './logo.svg';
import './App.css';
import {userState} from 'react';
import FlightAdd from './components/FlightAdd';
import FlightGetAllFlights from './components/FlightGetAllFlights';
import {BrowserRouter as Router , Routes , Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element = {<FlightGetAllFlights/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
