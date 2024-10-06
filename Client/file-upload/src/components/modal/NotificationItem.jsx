import React from 'react';
import '../../assets/css/modal/itemNotification.css';

const NotificationItem = ({ date, time, title, message, image }) => {
  return (
    <div className="notification-item">
      {/* Image */}
    
      {/* Conditionally render the image */}
      {image && (
        <img src={image} alt="Notification" className="notification-image" />
      )}

      {/* Content */}
      <div className="notification-content">
          <span>
          <span className="notification-date">{time}</span>

          <span className="notification-date">    {date}</span><br />
          </span>
        <div className="notification-header">
          {/* Title and Date */}
          <h4 className="notification-title">{title}</h4>
        </div>

        {/* Message */}
        <p className="notification-message">{message}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
