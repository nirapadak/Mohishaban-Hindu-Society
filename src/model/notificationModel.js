const mongoose = require('mongoose');


const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    max: 50,
    min: 3,
    default: "Welcome to Palpara",
  },
   description: {
     type: String,
  },
  image: {
    type: String,
    default: ""
  },
  date: {
    type: Date, default: Date.now
  },

}, {
  timestamps: true,
  versionKey: false,
})

const notificationModel = mongoose.model('notification', notificationSchema)

module.exports = notificationModel;
