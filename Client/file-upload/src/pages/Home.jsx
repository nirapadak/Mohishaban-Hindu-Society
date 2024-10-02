import React, {useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/home.css'

const Home = () => {

  const [data, setData] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/hero')
      .then(res => {
        console.log(res.data.data);
        setData(res.data.data);
    }).catch((err) => { 
      console.log(err);
    })
  },[])



  return (
    <div className='home-hero-container'>
      <img className='hero-img-container' src={data.image_one} alt="this is home image?" />
      <div className="content">
        <h1>{data.title}</h1>
        <button>Donate</button>

      </div>
    </div>
  );
};

export default Home;
