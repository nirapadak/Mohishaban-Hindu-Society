const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 50,
    min: 3,
    default: "nirapadak",
  },
   email: {
     type: String,
     default: "nirapadakpal@gmail.com",
     required: true,
  },
  image: {
    type: String,
    required: true,
  },
   date: { type: Date, default: Date.now },

}, {
  timestamps: true,
  versionKey: false,
})

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel;
