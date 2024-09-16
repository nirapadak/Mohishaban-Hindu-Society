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
  number: {
    type: String,
    required: true,
    min: 11,
    max: 11,
   },
  image: {
    type: String,
    required: true,
  },
  familyMember: {
    type: String,
    min: 1,
    default: 1,
  },
  post: {
    type: String,
    default: "Mamber"
  },
  subscription: {
    type: String,
    default: 0,
  },
  admin: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date, default: Date.now
  },

}, {
  timestamps: true,
  versionKey: false,
})

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel;
