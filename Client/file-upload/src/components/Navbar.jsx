import toast,{ Toaster } from 'react-hot-toast';
import '../assets/css/navbar.css'
import { Link } from 'react-router-dom';

export const Navbar = ({isLogined, userType}) => {


  function clearData() {
    localStorage.removeItem('auth_token');
    window.location.reload();  // refresh the page to clear the data
    toast.success('Logout Successfully Completed');  // show toast message when logout successful
  }


  return (
    <>
      <header>
        <h1 className="app-logo">Blog</h1>
        <nav>
          <ul>




            {isLogined && (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/login" onClick={clearData} className="nav-link">
                    Logout
                  </Link>
                </li>
                <li>
                  <Link to="*" className="nav-link">
                    Error
                  </Link>
                </li>
              </>
            )}




            <li>
              <a href="/register">Registration</a>
            </li>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>




            
          </ul>
        </nav>
        <Toaster position="bottom-center" />
      </header>
    </>
  );
}