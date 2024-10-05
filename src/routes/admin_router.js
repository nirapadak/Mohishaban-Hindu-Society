const express = require('express');
const { deleteUsers, deleteUsersMuli } = require('../controllers/admin');
const { getHeroes, updateHeroes, addHeroes } = require('../controllers/heroController');
const router = express.Router()




router.delete('/admin/delete/:id', deleteUsers);

router.get('/hero', getHeroes);
router.post('/hero/add', addHeroes);
router.patch('/hero/update/:id', updateHeroes);
router.delete('/admin/delete/users', deleteUsersMuli)



module.exports = router