const Joi = require('joi');

const nameSchema = Joi.string()
  .min(5)
  .label('name')
  .messages({
    'string.empty': 'name is not allowed to be empty',
    'string.min': '"name" length must be at least 5 characters long',
  });

const quantitySchema = Joi.number()
  .integer()
  .min(1)
  .messages({
    'number.integer': '"quantity" must be an integer',
    'number.min': '"quantity" must be greater than or equal to 1',
  
  });

module.exports = {
  nameSchema,
  quantitySchema,
};