
import './App.css';
import FlightAdd from './components/FlightAdd'
import FlightGetAllFlights from './components/FlightGetAllFlights';
import NavBar from  './components/navBar';
import Search from  './components/search';
import EditFlight from './components/EditFlight';
import SignUp from './components/SignUp';
import User_allFlights from './components/userComponents/AllFlights';
import SignInSide from './components/SignInSide'
import Home from './components/Home'
import SearchUser from './components/userComponents/SearchUser'
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
          <Route exact path='/sign' element = {<SignUp/>} />
          <Route exact path='/user/all_flights' element = {<User_allFlights/>} />
          <Route exact path='/login' element = {<SignInSide/>} />
          <Route exact path='/Home' element = {<Home/>} />
          <Route exact path='/user/SearchUser' element = {<SearchUser/>} />
          </Routes>
        
        </Router>
      
      
    </div>
  );
}

export default App;
