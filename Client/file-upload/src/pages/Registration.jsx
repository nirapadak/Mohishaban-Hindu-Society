import axios from 'axios';
import React, { useState } from 'react';
import '../assets/css/login.css';
import { useNavigate } from 'react-router';
import toast, {Toaster} from 'react-hot-toast';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const navigate = useNavigate();

  const loginSubmitFrom = async e => {
    e.preventDefault();
    // call backend API to regist
    console.log(email, number);

    const response = await axios.post(
      'http://localhost:5000/api/v1//users/login',
      {
        email,
        number,
      }
    );
    if (response) {
      // const data = response.json();
      console.log(response.data.admin);
      // cookie set ==============================
      // Cookies.set('token', response.data.token, { expires: 7 });
      if (response.data.user.admin === 1) {
        localStorage.setItem('admin', true);
      }
      localStorage.setItem('auth_token', response.data.token);
     

      // window.location.href = '/'; // redirect to profile page
      navigate('/')
      window.location.reload();
      toast.success('login success');
      
    } else {
      console.log('axios error' + response.massage);
    }
  };

  return (
    <div className="container">
      <form onSubmit={loginSubmitFrom}>
        <h1 className="login-title">Login</h1>
        <p className="login-sub">Welcome to the again</p>
        <label>Email : </label>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter your email"
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label>Number :</label>
        <input
          type="text"
          name="number"
          placeholder="Enter your number"
          value={number}
          onChange={e => setNumber(e.target.value)}
          required
        />
        <button type="submit" value="Submit">
          Login
        </button>
        <Toaster position="bottom-center" />
      </form>
    </div>
  );
};

export default Registration;
