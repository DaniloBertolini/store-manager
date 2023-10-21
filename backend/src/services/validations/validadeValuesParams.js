const { productsModel, salesModel } = require('../../models');

const validateValuesParams = async (productId, saleId) => {
  const [productById] = await productsModel.findByIdModel(productId);
  if (!productById) {
    return {
      codeStatus: 'NOT_FOUND',
      data: { message: 'Product not found in sale' },
    }; 
  }

  const [saleById] = await salesModel.findByIdModel(saleId);
  if (!saleById) {
    return {
      codeStatus: 'NOT_FOUND',
      data: { message: 'Sale not found' },
    }; 
  }
};

module.exports = validateValuesParams;