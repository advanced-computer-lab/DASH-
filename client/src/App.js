
import './App.css';
import { Component } from 'react';
import FlightAdd from './components/Admin/FlightAdd'
import FlightGetAllFlights from './components/Admin/FlightGetAllFlights';
import NavBar from './components/Admin/navBar';
import Search from './components/Admin/search';
import EditFlight from './components/Admin/EditFlight';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import User_Home from "./components/User/Home"
import User_Flights from "./components/User/Flights";
import Reserve from "./components/User/Reserve";
import User_Search from "./components/User/Search";
import { ProtectedRoute } from './components/protected_route';
import { ProtectedRouteUser } from './components/protected_route_user';
//import { ProtectedRouteGuest } from './components/protected_route_guest';


class App extends Component {

  render() {

    return (

      <Router>

        <Routes>

          <Route exact path='/' element={
            <ProtectedRoute >
              <NavBar />
            </ProtectedRoute>
          } />

          <Route exact path='/add' element={
            <ProtectedRoute>
              <FlightAdd />
            </ProtectedRoute>
          } />


          <Route exact path='/getFlights' element={
            <ProtectedRoute>
              <FlightGetAllFlights />
            </ProtectedRoute>
          } />

          <Route exact path='/search' element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          } />

          <Route exact path='/getFlights/editFlight:id' element={
            <ProtectedRoute>
              <EditFlight />
            </ProtectedRoute>
          } />

          <Route exact path='/sign' element={<SignUp />} />


          <Route exact path='/logIn' element={<LogIn />} />





          {/*routes for users*/}

          <Route exact path='/user/home' element={
            <ProtectedRouteUser>
              <User_Home /> 
            </ProtectedRouteUser>
          } />

          <Route exact path='/user/all_flights' element={
            <ProtectedRouteUser>
              <User_Flights />
            </ProtectedRouteUser>
          } />

          <Route exact path='/user/reserve' element={
            <ProtectedRouteUser>
              <Reserve/>
            </ProtectedRouteUser>
          } />

          <Route exact path='/user/search' element={
            <ProtectedRouteUser>
              <User_Search />
            </ProtectedRouteUser>
          } />


        </Routes>


      </Router>



    );
  }
}

export default App;
