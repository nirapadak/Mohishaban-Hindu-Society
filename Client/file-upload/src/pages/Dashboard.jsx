import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../assets/css/dashboard.css';
// react icons =====================================
import { FaUserEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import toast, {Toaster} from 'react-hot-toast';
import UserEditModal from '../components/modal/UserEditModal';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  const [modal, setModal] = useState(false);

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

  // user edit =============================
  function userEdit(id) {
    console.log(id);
    setModal(true);
    return id;
  }
  // modal close ============================
  function closeModalYes() {
    
    setModal(false);
  }
  function closeModalNot() {
    setModal(false);
  }

  // user delete =================================
  function userDelete(id) {

    console.log(id);
    axios
      .delete(`http://localhost:5000/api/v1/admin/delete/${id}`)
      .then(res => {
        console.log(res);
        const updatedUsers = users.filter(user => user._id !== id);
        setUsers(updatedUsers);
        toast.success('User Delete successfully');
      }).catch(err => { 
        console.log(err);
      });
  }

  return (
    <div className="container">
      {modal && <UserEditModal Yes={closeModalYes} Not={closeModalNot} />}

      <div className="user-table-container">
        <h2>User List</h2>

        <div className="dashboard-home">
          <h3>Number of User : {users.length}</h3>
        </div>

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
              <th>Image</th>
              <th>ID/Mobile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Role</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      className="profile-img-td"
                      src={user.image}
                      alt="profile"
                    />
                  </td>
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
                      <FaUserEdit />
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
        <Toaster position="bottom-center" />
      </div>
    </div>
  );
};

export default Dashboard;
