import React, { useEffect, useState } from 'react';
import '../assets/css/profile.css'
import axios from 'axios';
import { useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {


  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      
      axios.get('http://localhost:5000/api/v1/users/' + token)
        .then((response) => {
          if (response.data.data !=null) {

            console.log(response.data.data.name);

            setName(response.data.data.name);
            setEmail(response.data.data.email);
            setImage(response.data.data.image);
          } else {
            setName('user dose not found');
            setEmail('user email dose not exist')
            setImage(
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxJdxLk4Hg-r-7iq2c85fXxafBwnBkLfMZzW-vfSuYB0pmZqueObRDjrhbayS4yYYCdNg&usqp=CAU'
            );
          }
          
      })
    } else {
      navigate('/login');
    }
  })

  const deleteAccount = () => { 
    const userId = localStorage.getItem('auth_token')
    const imgName = localStorage.getItem('imageName')
    axios.delete('http://localhost:5000/api/v1/profile/delete/?userId='+userId+'&imageUrl='+imgName )
     .then((response) => {
       if (response.status === 200) {
          toast.success('Account Delete Successfully Completed');
          localStorage.removeItem('auth_token');
          localStorage.removeItem('imageName');
          navigate('/login');
        }
      })
     .catch((error) => {
        console.error('Error:', error);
      });
  }

const notify = () => toast.success('Logout Successfully Completed');



  return (
    <div className='profile-container'>
      <img src={image} alt="profile" />
      <h3>My name is : {name}</h3>
      <h3>Email : {email}</h3>
      <button onClick={notify}>Logout</button>
      <button className='delete-btn' onClick={deleteAccount}>Delete Account</button>
      <Toaster
        position='bottom-center'
      />
      
    </div>
  );
};

export default Profile;