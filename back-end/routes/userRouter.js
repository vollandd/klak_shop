const express = require('express');
const router = express.Router();
const productController = require('../controllers/userController');


router.post('/login', productController.login);
router.post('/signup', productController.signup);



module.exports = router;