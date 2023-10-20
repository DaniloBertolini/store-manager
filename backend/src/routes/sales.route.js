const route = require('express').Router();
const { salesController } = require('../controllers');
const validateCreateSales = require('../middlewares/validateCreateSales');

route.get('/', salesController.getAllSales);

route.get('/:id', salesController.getSaleById);

route.post('/', validateCreateSales, salesController.createSale);

module.exports = route;