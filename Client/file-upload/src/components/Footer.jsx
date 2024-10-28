import React from 'react';
import '../assets/css/footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-column">
        <h3>Help Center</h3>
        <p>Email: helpcenter@example.com</p>
        <p>Contact Number: +123 456 789</p>
      </div>

      <div className="footer-column">
        <h3>Village Panchayat</h3>
        <div className="panchayat-info">
          <img
            src="https://scontent.fdac146-1.fna.fbcdn.net/v/t39.30808-6/432371760_122133955886138814_2570513769727916953_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHDnbvAslYz8TzLGn4Sw55UGW9OktD4uREZb06S0Pi5Ec8Ztocft9NHD459w6gwjvZQEqhaMFLZYdVeo3_8lD8Y&_nc_ohc=rjHGkkv8A7AQ7kNvgHpOaIQ&_nc_ht=scontent.fdac146-1.fna&_nc_gid=A5ZfBBUtAwUmZ41RZrGMwSG&oh=00_AYAAshcyR1wY6s9Z4lApVKuRmiU3d5M_qptcbOHDMo-A3w&oe=6708530F"
            alt="Village Panchayat"
            className="panchayat-img"
          />
          <p>Name: Nikunja Kumar Paul</p>
          <p>Number: +123 456 789</p>
        </div>
      </div>

      <div className="footer-column">
        <ul>
          <li>
            <a href="#navbar"></a>
            <a href="#navbar">About</a>
            <a href="#navbar">Profile</a>
            <a href="#navbar">Notification</a>
      
          </li>
          <li>
            <a href="#policy">Policy</a>
          </li>
          <li>
            <a href="#social-responsibility">নীতি সামাজীক দায়ীত্ব</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
