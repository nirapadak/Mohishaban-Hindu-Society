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
    <div className="home-hero-container">
      <div className="content">
        <h1 className="title-home">{data.title}</h1>
        <p className="home-description">{data.description}</p>
        <div className="but-container">
          <button className="btn-donate">Donate</button>
          <button>See More</button>
        </div>
      </div>
      <img
        className="hero-img-container"
        src={data.image_two}
        alt="this is home image?"
      />
    </div>
  );
};

export default Home;
