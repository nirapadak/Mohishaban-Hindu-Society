import '../assets/css/navbar.css'

export const Navbar = () => {


  function clearData() {
    localStorage.removeItem('auth_token');
    window.location.reload();  // refresh the page to clear the data
  }


  return <>
    <header>
      <h1>Blog</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a onClick={clearData} href="/login">Logout</a></li>
        </ul>
      </nav>
    </header>
  
    
  
  </>
}