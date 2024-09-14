import React from 'react';


const Profile = () => {


  const Image = 'http://res.cloudinary.com/dwlcudfef/image/upload/v1726305673/ydss52uefjx6qplf55h3.jpg';
  // const url = 
  
  

  // const onsubmit = async() => {
  //   var localData = localStorage.getItem('auth_token')
  //   if (localData) {
  //     const response = fetch(
  //       'http://localhost:5000/api/v1/users/' + localData, {
  //         method: 'GET',
  //       }
  //     );
  //     console.log(response);
  //   }
  //   console.log(localData);

    
  // }


  return (
    <div className='profile-container'>
      <img src={Image} alt="profile"/>
    
    
      <p>This is my profile page</p>
      <button>get Data</button>
      
    </div>
  );
};

export default Profile;