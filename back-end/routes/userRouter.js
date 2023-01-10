const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/createUser', userController.createUser);
router.get('/', userController.getAllUser);
router.get('/user', userController.getAllUser);
router.get('/:id', userController.getOneUser);
router.put('/:id', userController.modifyUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;