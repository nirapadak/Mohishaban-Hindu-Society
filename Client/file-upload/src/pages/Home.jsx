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
    <div>
      <div className="home-hero-container">
        <img
          className="hero-img-background"
          src={data.image_three}
          alt="this is home image?"
        />
        <div className="content">
          <h1 className="sironame">{data.title}</h1>
          <p className="title-sub">সকলকে মহালয়ার শুভেচ্ছা সৌজন্য –</p>
          <h1 className="title-home">
            মহিষাবান পালপাড়া ডাঃ বাড়ী সার্বজনীন দূর্গাপূজা মন্দির কমিটি
          </h1>
          <p className="home-description">"{data.description}"</p>
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
      {/* saction two================================================== */}
      <div className="section-two">
        <div className="two-section-image">
          <img
            className="section-two-img"
            src="https://res.cloudinary.com/dwlcudfef/image/upload/v1727887635/durga-puja_etxqsq.webp"
            alt="image"
          />
        </div>

        <div className="saction-two-content">
          <h2>এই মন্দিরে কি কি আছে?</h2>
          <p>
            মহিষাবান পালপাড়া ডাঃ বাড়ী সার্বজনীন দূর্গাপূজা মন্দির কমিটির উপর
            দেশের অন্যতম মন্দিরের ইংরেজীতের প্রতিভাবনা। আমিদের মন্দিরের উপর
            দেশের প্রতিভাবনার প্রধান অংশ হচ্ছে এ
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
