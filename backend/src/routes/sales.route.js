const route = require('express').Router();
const { salesController } = require('../controllers');
const validateQuantity = require('../middlewares/validadeQuantity');
const validateCreateSales = require('../middlewares/validateCreateSales');

route.get('/', salesController.getAllSales);
route.get('/:id', salesController.getSaleById);
route.post('/', validateCreateSales, salesController.createSale);
route.delete('/:id', salesController.deleteSale);

route.put(
  '/:saleId/products/:productId/quantity',
  validateQuantity,
  salesController.updateQuantitySale,
);

module.exports = route;