const route = require('express').Router();
const { productsController } = require('../controllers');
const validateCreateProducts = require('../middlewares/validateCreateProduct');

route.get('/', productsController.getAllProducts);

route.get('/search', productsController.getProductByName);

route.get('/:id', productsController.getProductById);

route.post('/', validateCreateProducts, productsController.createProduct);

route.put('/:id', validateCreateProducts, productsController.updateProduct);

route.delete('/:id', productsController.deleteProduct);

module.exports = route;