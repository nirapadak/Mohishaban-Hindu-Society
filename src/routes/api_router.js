const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const express = require('express');
const router = express.Router()
const {authMiddleware, isAdmin } = require('../helpers/auth')

const { getUsers, TowUsers, profileCreate, profileData, profileDelete, profileLogin, getAllUsers } = require('../controllers/profile');
const upload = require('../services/uploadService');

cloudinary.config({
  cloud_name: process.env.NAME,
  api_key: process.env.API,
  api_secret: process.env.SECRET,
});



router.get('/', TowUsers);
// admin and user both have access to this service ==============
router.get('/users/profile', authMiddleware, isAdmin, getUsers)
// send token from hearder ======================
router.get('/users', authMiddleware, profileData);

router.post('/profile/upload', upload.single('file'), profileCreate);
router.delete('/profile/delete', authMiddleware, profileDelete);
router.post('/users/login', profileLogin)


// ============================== admin routes =============================
router.get('/admin/dashboard', authMiddleware, isAdmin, getAllUsers);


module.exports = router