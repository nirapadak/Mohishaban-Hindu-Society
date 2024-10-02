const express = require('express');
const { deleteUsers } = require('../controllers/admin');
const { getHeroes, updateHeroes, addHeroes } = require('../controllers/heroController');
const router = express.Router()




router.delete('/admin/delete/:id', deleteUsers);

router.get('/hero', getHeroes);
router.post('/hero/add', addHeroes);
router.patch('/hero/update/:id', updateHeroes);



module.exports = router