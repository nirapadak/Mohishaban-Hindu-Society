import { Toaster } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import '../assets/css/navbar.css';

import { IoIosNotifications } from 'react-icons/io';
import { RiAccountCircleFill } from 'react-icons/ri';

import NotificationDrawer from './NotificationDrawer';
import { useState } from 'react';
import ProfileDrawer from './ProfileDrawer';

export const Navbar = ({ isLogined, userType }) => {

  

  // function clearData() {
  //   localStorage.removeItem('auth_token');
  //   localStorage.removeItem('admin');
  //   navigate('/login'); // redirect to login page
  //   window.location.reload(); // refresh the page to clear the data
  //   toast.success('Logout Successfully Completed'); // show toast message when logout successful
  // }

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const toggleProfileDrawer = () => {
    setIsProfileOpen(!isProfileOpen);
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
                {/* <li>
                  <NavLink to="/profile" className="nav-link">
                    Profile
                  </NavLink>
                </li> */}
                <li className="nav-link-icons">
                  <IoIosNotifications
                    className="nav-icons"
                    onClick={toggleDrawer}
                  />

                  <RiAccountCircleFill
                    className="nav-icons"
                    onClick={toggleProfileDrawer}
                  />
                </li>
              </>
            ) : (
              isLogined && (
                <>
                  {/* <li>
                    <NavLink to="/profile" className="nav-link">
                      Profile
                    </NavLink>
                  </li> */}

                  <li>
                    <NavLink className="nav-link">
                      <IoIosNotifications onClick={toggleDrawer} />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link">
                      <RiAccountCircleFill
                        onClick={toggleProfileDrawer}
                      />
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
        <ProfileDrawer
          isOpen={isProfileOpen}
          toggleProfileDrawer={toggleProfileDrawer}
        />
      </header>
    </>
  );
};
