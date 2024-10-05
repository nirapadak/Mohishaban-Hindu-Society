
import { React } from 'react';
import { Route, Routes } from 'react-router-dom';
import './assets/css/app.css';
import About from './components/About';
import { Navbar } from './components/Navbar';
import Profile from './components/Profile';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';




function App() {


  const isLogined = window.localStorage.getItem('auth_token');
  const userType = window.localStorage.getItem('admin');

  return (
    <>
      {/* nav================================ */}
      <Navbar isLogined={isLogined} userType={userType}/>
    
      <Routes>


      <Route path='/' Component={Home}/>
      <Route path='/register' Component={Login} />
      <Route path='/login' Component={Registration} />
        

        
        {/* this is Protected Route ============================ */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedAdminRoute />}>
            <Route path='/dashboard' Component={Dashboard} />
          </Route>
          <Route path='/profile' Component={Profile}/>
        </Route>



      <Route path='/about' Component={About}/>
      <Route path='*' Component={Error}/>
      
    
    
    </Routes>
    </>
 
  );
}

export default App;
