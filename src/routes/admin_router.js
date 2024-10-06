const express = require('express');
const { deleteUsers, deleteUsersMuli } = require('../controllers/admin');
const { getHeroes, updateHeroes, addHeroes } = require('../controllers/heroController');
const { createNotification, getNotification } = require('../controllers/notification');
const router = express.Router()




router.delete('/admin/delete/:id', deleteUsers);

router.get('/hero', getHeroes);
router.post('/hero/add', addHeroes);
router.patch('/hero/update/:id', updateHeroes);
router.delete('/admin/delete/users', deleteUsersMuli)

// Notifications ================================
router.post('/notification/send', createNotification)
router.get('/notification/get', getNotification);



module.exports = router