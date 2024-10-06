import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import '../assets/css/modal/profileDrawer.css';// You can customize profile-related styles here
import { useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import '../assets/css/profile.css'

const ProfileDrawer = ({ isOpen, toggleProfileDrawer }) => {
  //

  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [role, setRole] = useState('');
  const [f_num, setF_num] = useState('');
  const [subscription, setSubscription] = useState('');
  const [post, setPost] = useState('');
  const [number, setNumber] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    console.log(token);
    if (token) {
      axios
        .get('http://localhost:5000/api/v1/users', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })
        .then(response => {
          console.log(response.data.data);
          if (response.data.data != null) {
            console.log(response.data.data.name);

            setName(response.data.data.name);
            setEmail(response.data.data.email);
            setImage(response.data.data.image);
            setId(response.data.data._id);
            setRole(response.data.data.admin);
            setF_num(response.data.data.familyMember);
            setSubscription(response.data.data.subscription);
            setPost(response.data.data.post);
            setNumber(response.data.data.number);
          } else {
            setName('user dose not found');
            setEmail('user email dose not exist');
            setImage(
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxJdxLk4Hg-r-7iq2c85fXxafBwnBkLfMZzW-vfSuYB0pmZqueObRDjrhbayS4yYYCdNg&usqp=CAU'
            );
            navigate('/login');
            localStorage.removeItem('auth_token');
            toast.error('User not found! please login again');
          }
        });
    } else {
      navigate('/login');
    }
  },[]);

  const deleteAccount = () => {
    const token = localStorage.getItem('auth_token');
    axios
      .delete('http://localhost:5000/api/v1/profile/delete', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .then(response => {
        if (response.status === 200) {
          toast.success('Account Delete Successfully Completed');
          localStorage.removeItem('auth_token');
          localStorage.removeItem('admin');
          navigate('/register');
          window.location.reload(); // refresh the page to clear the data
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const notify = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('admin');
    navigate('/login');
    window.location.reload(); // refresh the page to clear the data
    toast.success('Logout Successfully Completed');
  };

  return (
    <>
      {/* Side Drawer */}
      <div className={`profile-drawer ${isOpen ? 'open' : 'gone'}`}>
        <div className="drawer-header">
          <h2>Profile</h2>
          <button onClick={toggleProfileDrawer}>
            <IoClose className="closeDrawer-btn" />
          </button>
        </div>
        <div className="drawer-content">
          {/* Profile Content */}
          {name ? (
            <div className="profile-details">
              <img src={image} alt="Profile" className="profile-image" />
              <h3>{name.toUpperCase()}</h3>
              <div className="profile-details">
                {/* <p className="profile-id">ID: {id}</p> */}
                <p className="profile-role">
                  Role: {role === 1 ? <text>Admin</text> : <text>User</text>}
                </p>
                <p className="profile-post">Post: {post}</p>
                <p className="profile-email">Email: {email}</p>
                <p className="profile-mobile">Mobile: {number}</p>
                <p className="profile-family">Family Members: {f_num}</p>
                <p className="profile-subscription">
                  Subscription: {subscription}
                </p>
              </div>

              
              {/* Add other profile-related details */}
               <div className="profile-actions">
          <button className="btn delete-btn" onClick={deleteAccount}>
            Delete Account
          </button>
          <button className="btn logout-btn" onClick={notify}>
            Logout
                </button>
                </div>
            </div>
          ) : (
            <p>No profile data available</p>
          )}
          
        </div>
      </div>

      {/* Overlay to close drawer when clicking outside */}
      {isOpen && (
        <div className="drawer-overlay" onClick={toggleProfileDrawer}></div>
      )}
    </>
  );
};

export default ProfileDrawer;
