import React, {useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/home.css'
import { FcDonate } from 'react-icons/fc';
import { useNavigate } from 'react-router';
import UserEditModal from '../components/modal/UserEditModal';
import DateTime from './DateTime';

const Home = () => {

  const [data, setData] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/hero')
      .then(res => {
        console.log(res.data.data);
        setData(res.data.data);
    }).catch((err) => { 
      console.log(err);
    })
  },[])

  function clickSeeMore() {
    navigate('/about');
  }

  const modalMassage = 'এই সার্ভিস টি অামাদের এখনো সেট করা হয় নি ';
  const modalData = 'দুঃখিত আপনি এটি সম্পাদনা করবেন না';
  const [modal, setModal] = useState(false);

  
  const closeModalYes = () => {
    setModal(false);
    // call the function to save data
  };
  const closeModalNot = () => {
    setModal(false);
  };

  const showModal = () => {
    setModal(true);
  };

  return (
    <div>
      {/* this is a Toast Modal ==================================== */}
      {modal && (
        <UserEditModal
          massage={modalMassage}
          data={modalData}
          Yes={closeModalYes}
          Not={closeModalNot}
        />
      )}
      {/* this is modal end ==================================== */}

      <div className="home-hero-container">
        <img
          className="hero-img-background"
          src={data.image_three}
          alt="this is home image?"
        />
        <div className="content">
          <h1 className="sironame">{data.title}</h1>
          <p className="title-sub">সকলকে মহালয়ার শুভেচ্ছা সৌজন্যে –</p>
          <h1 className="title-home">
            মহিষাবান পালপাড়া ডাঃ বাড়ী সার্বজনীন <br />
            শ্রী শ্রী দূর্গাপূজা মন্দির কমিটি
          </h1>
          <p className="home-description">"{data.description}"</p>
          <div className="but-container">
            <button className="btn-donate" onClick={showModal}>
              Donate <FcDonate />
            </button>
            <button className="btn-SeeMore" onClick={clickSeeMore}>
              See More
            </button>
          </div>
        </div>
        <img
          className="hero-img-container"
          src={data.image_two}
          alt="this is home image?"
        />
      </div>
      {/* saction two================================================== */}
      <DateTime/>
      <div className="section-two">
        <div className="two-section-image">
          <img
            className="section-two-img"
            src="https://res.cloudinary.com/dwlcudfef/image/upload/v1727887635/durga-puja_etxqsq.webp"
            alt="Not showing Image"
          />
        </div>

        <div className="saction-two-content">
          <div className="saction-title-two">
            <div className="line-one"></div>
            <h2 className="saction-two-header">আমাদের কাজ কি কি ?</h2>
            <div className="line-two"></div>
          </div>
          {/* three card design */}
        </div>
      </div>
    </div>
  );
};

export default Home;
