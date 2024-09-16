import React from 'react';
import '../assets/css/login.css'

const Registration = () => {
  return (
    <div className="container">
      <form>
        <h1 className="login-title">Login</h1>
        <p className='login-sub'>Welcome to the again</p>
        <label>Name:</label>
        <input type="text" name="name" required />
        <label>Email:</label>
        <input type="email" name="email" required />
        <label>Password:</label>
        <input type="password" name="password" required />
        <button type="submit" value="Submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Registration;