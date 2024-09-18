import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../assets/css/dashboard.css';
// react icons =====================================
import { MdDelete } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  // If the token is not present, redirect to login page
  if (!localStorage.getItem('auth_token') || !localStorage.getItem('admin')) {
    // window.location.href('/')
    window.location.reload();
  }

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/v1/admin/dashboard', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('auth_token'),
        },
      })
      .then(response => {
        console.log(response);
        console.log(response.data.data);
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);


  // user delete and edit ===================================================

  function userEdit(id) {
    console.log(id);
    
  }

  function userDelete(id){
    console.log(id);
  }




  return (
    <div className="container">
      <h1>Dashboard Page</h1>
      <p>Welcome to the dashboard page!</p>

      <div className="user-table-container">
        <h2>User List</h2>

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-box"
        />

        {/* User Table */}
        <table className="user-table">
          <thead>
            <tr>
              <th>No</th>
              <th>ID/Mobile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Role</th>
              <th>edit</th>
              <th>delete</th>
             
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td> {/* or user.number */}
                  <td>{user.number}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.subscription}</td>
                  <td>{user.admin}</td>
                  <td>
                    {/* Edit and Delete Buttons */}
                    <h3
                      onClick={() => userEdit(user._id)}
                      className="edit-user"
                    >
                      <FaUserEdit/>
                    </h3>
                  </td>
                  <td>
                    <h3
                      onClick={() => userDelete(user._id)}
                      className="delete-user"
                    >
                      <MdDelete />
                    </h3>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
