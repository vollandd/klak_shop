const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

router.post('/createProduct', auth,  productController.createProduct);
router.get('/', auth, productController.getAllProduct);
router.get('/:id', auth, productController.getOneProduct);
router.put('/:id', auth, productController.modifyProduct);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;