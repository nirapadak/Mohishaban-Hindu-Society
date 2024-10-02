const mongoose = require('mongoose');


const heroSchema = new mongoose.Schema({
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
  image_one: {
    type: String,
    required: true,
  },
  image_two: {
    type: String,
  },
  image_three: {
    type: String,
  },
  date: {
    type: Date, default: Date.now
  },

}, {
  timestamps: true,
  versionKey: false,
})

const HomeHero = mongoose.model('hero', heroSchema)

module.exports = HomeHero;
