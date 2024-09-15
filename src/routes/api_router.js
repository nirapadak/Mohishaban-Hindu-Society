const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const express = require('express');
const router = express.Router()
const app = express();

const { getUsers, TowUsers, profileCreate, profileData, profileDelete } = require('../controllers/profile');
const upload = require('../services/uploadService');

cloudinary.config({
  cloud_name: process.env.NAME,
  api_key: process.env.API,
  api_secret: process.env.SECRET,
});



router.get('/', TowUsers);
router.get('/users/profile', getUsers)
router.get('/users/:id', profileData);
router.post('/profile/upload', upload.single('file'), profileCreate);
router.delete('/profile/delete', profileDelete);


module.exports = router