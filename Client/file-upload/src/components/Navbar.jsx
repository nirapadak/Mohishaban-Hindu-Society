import toast, { Toaster } from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import '../assets/css/navbar.css';


export const Navbar = ({ isLogined, userType }) => {


  const navigate = useNavigate();


  function clearData() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('admin');
    navigate('/login')// redirect to login page
    window.location.reload(); // refresh the page to clear the data
    toast.success('Logout Successfully Completed'); // show toast message when logout successful
  }

  return (
    <>
      <header>
        <h1 className="app-logo">Blog</h1>
        {/* add id to active and panding  */}
        <nav id="sidebar">
          <ul>
            <li>
              <NavLink
                to="/"
                // className={({ isActive, isPending }) =>
                //   isPending ? 'pending' : isActive ? 'active' : ''
                // }
              >
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
                </>
              )
            )}

            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            {/* <li>
              <NavLink to="*" className="nav-link">
                Error
              </NavLink>
            </li> */}
          </ul>
        </nav>
        <Toaster position="bottom-center" />
      </header>
    </>
  );
};
