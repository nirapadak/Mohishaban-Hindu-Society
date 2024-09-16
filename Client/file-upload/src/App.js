
import { React } from 'react';
import './assets/css/app.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Profile from './components/Profile';
import Home from './pages/Home';
import About from './components/About';
import { Navbar } from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Registration from './pages/Registration';



function App() {

  const isLogined = window.localStorage.getItem('auth_token');
  const userType = window.localStorage.getItem(true);


  return (
    <Router>
      {/* nav================================ */}
      <Navbar isLogined={isLogined} userType={userType}/>
    
      <Routes>
      <Route path='/' Component={Home}/>
      <Route path='/register' Component={Login} />
      <Route path='/login' Component={Registration} />
        

        
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
