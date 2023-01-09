/* rooter config
  use express router
 /api/product removed
 app.use is replaced by app.get()
*/
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.createProduct);
router.get('/', productController.getAllProduct);
router.get('/product', productController.getAllProduct);
router.get('/clothing', productController.getClothing);
router.get('/:id', productController.getOneProduct);
router.put('/:id', productController.modifyProduct);
router.delete('/:id', productController.deleteProduct);


module.exports = router;

//https://app.getpostman.com/join-team?invite_code=6b57d37bbb05605ceb731ab7de705db3
