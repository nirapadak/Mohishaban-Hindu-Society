import React from 'react';
import '../assets/css/notification.css';
import { IoClose } from 'react-icons/io5';
import NotificationItem from './modal/NotificationItem';

const NotificationDrawer = ({ isOpen, toggleDrawer }) => {
  
  const notifications = [
    {
      date: '2024-10-05',
      title: 'New Message from John',
      message: 'Hey! Check out the new feature I added.',
      image: '',
    },
    {
      date: '2024-10-04',
      title: 'System Update',
      message: 'Your system has been updated to version 2.0.',
      image: 'https://via.placeholder.com/50',
    },
  ];

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
            {notifications.map((notif, index) => (
              <NotificationItem
                key={index}
                date={notif.date}
                title={notif.title}
                message={notif.message}
                image={notif.image}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Overlay to close drawer when clicking outside */}
      {isOpen && <div className="drawer-overlay" onClick={toggleDrawer}></div>}
    </>
  );
};

export default NotificationDrawer;
