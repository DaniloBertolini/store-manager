const checkRequiredFields = require('../utils/checkRequiredFields');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const validateCreateProducts = (req, res, next) => {
  const { body } = req;
  const requiredKeys = ['name'];

  const missingKeys = checkRequiredFields(body, requiredKeys);
  if (missingKeys) return res.status(mapStatusHTTP('BAD_REQUEST')).json({ message: missingKeys });

  next();
};

module.exports = validateCreateProducts;