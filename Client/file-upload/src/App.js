
import { React } from 'react';
import './assets/css/app.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Profile from './components/Profile';
import Home from './pages/Home';
import About from './components/About';
import { Navbar } from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';



function App() {

  

  return (
    <Router>
      <Navbar />
    
      <Routes>
      <Route path='/' Component={Home}/>
        <Route path='/login' Component={Login} />
        

        
        {/* this is Protected Route ============================ */}
        <Route element={<ProtectedRoute/>}>
          <Route path='/profile' Component={Profile}/>
        </Route>



      <Route path='/about' Component={About}/>
      
    
    
    </Routes>
    </Router>
 
  );
}

export default App;
