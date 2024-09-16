const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const express = require('express');
const router = express.Router()
const {authMiddleware } = require('../helpers/auth')

const { getUsers, TowUsers, profileCreate, profileData, profileDelete } = require('../controllers/profile');
const upload = require('../services/uploadService');

cloudinary.config({
  cloud_name: process.env.NAME,
  api_key: process.env.API,
  api_secret: process.env.SECRET,
});



router.get('/', TowUsers);
router.get('/users/profile', getUsers)
// send token from hearder ======================
router.get('/users', authMiddleware, profileData);

router.post('/profile/upload', upload.single('file'), profileCreate);
router.delete('/profile/delete', authMiddleware, profileDelete);


module.exports = router