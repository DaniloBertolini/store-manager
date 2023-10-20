const checkRequiredFields = require('../utils/checkRequiredFields');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const validateCreateSales = (req, res, next) => {
  const { body } = req;
  const requiredKeys = ['productId', 'quantity'];
  
  if (body.length === 0) {
    return res.status(mapStatusHTTP('BAD_REQUEST'))
      .json({ message: '"sales" is required' }); 
  }
  
  for (let i = 0; i < body.length; i += 1) {
    const missingKeys = checkRequiredFields(body[i], requiredKeys);
    if (missingKeys) return res.status(mapStatusHTTP('BAD_REQUEST')).json({ message: missingKeys });
  }
  
  next();
};

module.exports = validateCreateSales;

// 5.1