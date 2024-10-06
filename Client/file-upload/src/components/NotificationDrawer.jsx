import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import '../assets/css/notification.css';
import NotificationItem from './modal/NotificationItem';

const NotificationDrawer = ({ isOpen, toggleDrawer }) => {
  const [notification, setNotifications] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/v1/notification/get', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        setNotifications(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

 

  return (
    <>
      {/* Side Drawer */}
      <div className={`notification-drawer ${isOpen ? 'open' : 'gone'}`}>
        <div className="drawer-header">
          <h2>Notifications</h2>
          <button onClick={toggleDrawer}>
            <IoClose className="closeDrawer-btn" />
          </button>
        </div>
        <div className="drawer-content">
          {/* Notification list or content goes here */}
          {/* Render each notification item */}
          <div className="drawer-content">
            {Array.isArray(notification) && notification.length > 0 ? (
              notification.map((notif, index) => (
                <NotificationItem
                  key={index}
                  date={new Date(notif.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  time={new Date(notif.date).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  title={notif.title}
                  message={notif.description}
                  image={notif.image}
                />
              ))
            ) : (
              <p>No notifications available</p>
            )}
          </div>
        </div>
      </div>

      {/* Overlay to close drawer when clicking outside */}
      {isOpen && <div className="drawer-overlay" onClick={toggleDrawer}></div>}
    </>
  );
};

export default NotificationDrawer;
