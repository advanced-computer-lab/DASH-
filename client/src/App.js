import './App.css';

import FlightAdd from './components/FlightAdd'
import FlightSearch from './components/FlightSearch'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'



function App() {
  
  
    
  return (
    <div className="App">
      <Router>
        <Routes>
          
          <Route exact path='/' element={<FlightAdd />} />
          <Route exact path='/Search' element={<FlightSearch />} />
        </Routes>
        </Router>
      
        
    </div>
  );
}

export default App