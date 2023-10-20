const { productsModel } = require('../../models');
const { quantitySchema } = require('./schemas');

const validateIdExists = async (itemsSold) => {
  const promises = itemsSold.map(async (item) => {
    const { error } = quantitySchema.validate(item.quantity);
    if (error) {
      return { codeStatus: 'INVALID_VALUE', data: { message: error.message } }; 
    }

    const [productId] = await productsModel.findByIdModel(item.productId);
    if (!productId) {
      return {
        codeStatus: 'NOT_FOUND',
        data: { message: 'Product not found' },
      }; 
    }
    return null;
  });

  const results = await Promise.all(promises);
  return results;
};

module.exports = validateIdExists;