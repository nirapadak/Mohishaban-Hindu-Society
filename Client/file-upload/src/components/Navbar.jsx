import toast, { Toaster } from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import '../assets/css/navbar.css';
import { IoIosNotifications } from 'react-icons/io';
import { RiAccountCircleFill } from 'react-icons/ri';
import { FaGripLinesVertical } from 'react-icons/fa';
import NotificationDrawer from './NotificationDrawer';
import { useState } from 'react';

export const Navbar = ({ isLogined, userType }) => {
  const navigate = useNavigate();

  function clearData() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('admin');
    navigate('/login'); // redirect to login page
    window.location.reload(); // refresh the page to clear the data
    toast.success('Logout Successfully Completed'); // show toast message when logout successful
  }

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <header>
        <h1 className="app-logo">Mohishaban Hindu Society</h1>

        <nav id="sidebar">
          <ul>
            <li>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>

            {!isLogined && (
              <>
                <li>
                  <NavLink to="/register" className="nav-link">
                    Registration
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            )}

            {isLogined && userType ? (
              <>
                <li>
                  <NavLink to="/dashboard" className="nav-link">
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile" className="nav-link">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" onClick={clearData} className="nav-link">
                    Logout
                  </NavLink>
                </li>
                <li className="nav-link-icons">
                  <IoIosNotifications
                    className="nav-icons"
                    onClick={toggleDrawer}
                  />
                 
                  <RiAccountCircleFill
                    className="nav-icons"
                    onClick={toggleDrawer}
                  />
                </li>
              </>
            ) : (
              isLogined && (
                <>
                  <li>
                    <NavLink to="/profile" className="nav-link">
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      onClick={clearData}
                      className="nav-link"
                    >
                      Logout
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link">
                      <IoIosNotifications onClick={toggleDrawer} />
                    </NavLink>
                  </li>
                </>
              )
            )}

            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </nav>
        <Toaster position="bottom-center" />
        <NotificationDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      </header>
    </>
  );
};
