const notificationModel = require('../model/notificationModel');

exports.createNotification = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    const newNotification = new notificationModel({
      title,
      description,
      image,
    });

    const savedNotification = await newNotification.save();

    res.json({
      success: true,
      message: 'Notification Sended successfully',
      data: savedNotification,
    })
    
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    })
  }
}


exports.getNotification = async (req, res) => {
  try {
    const notifications = await notificationModel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      message: 'Notifications fetched successfully',
      numberOfNotifications: notifications.length,
      data: notifications,
    })
    
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    })
  }
}