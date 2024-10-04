import { React, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import '../assets/css/login.css';

const Login = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');

  // navigation state ================
  const navigate = useNavigate();

  const uploadFile = async event => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('number', number);

    try {
      const response = await fetch(
        'http://localhost:5000/api/v1/profile/upload',
        {
          method: 'POST',
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();

        console.log('Success:', data);
        // Store the authentication token in local storage in browser
        if (data.data.admin === 1) {
          localStorage.setItem('admin', true);
        }
        localStorage.setItem('auth_token', data.auth_token);
        // Create a Toast =====================================
        navigate('/');
        window.location.reload(); // refresh the page to clear the data
        
        toast.success('Registration successfully');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('error during the file upload', error);
    }
  };

  const hendleFileChange = event => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="container">
      <form onSubmit={uploadFile}>
        <h2 className="login-title">Registration</h2>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label>Number</label>
        <input
          type="number"
          name="number"
          placeholder="Enter your number"
          value={number}
          onChange={e => setNumber(e.target.value)}
        />
        <input
          className="input-file"
          type="file"
          name="file"
          accept=".jpg,.png,.jpeg"
          onChange={hendleFileChange}
        />
        <div className="content-check">
          <input type="checkbox" name="checkbox" className="check" />
          <label className="check-label">Remember me</label>
        </div>
        <button type="submit">Registration</button>
        <Toaster position="bottom-center" />
      </form>
    </div>
  );
};

export default Login;
