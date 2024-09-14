import {React, useState} from 'react';

const Login = () => {

  
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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

    try {
      const response = await fetch('http://localhost:5000/api/v1/profile/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();

        
        console.log('Success:', data.data._id);
        // Store the authentication token in local storage in browser
        localStorage.setItem('auth_token', data.data._id);
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
    <div className="App">
      <form onSubmit={uploadFile}>
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
        <input
          type="file"
          name="file"
          accept=".jpg,.png,.jpeg"
          onChange={hendleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}


export default Login;