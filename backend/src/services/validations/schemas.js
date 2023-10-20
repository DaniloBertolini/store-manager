const Joi = require('joi');

const nameSchema = Joi.string()
  .min(5)
  .label('name')
  .messages({
    'string.empty': 'name is not allowed to be empty',
    'string.min': '"name" length must be at least 5 characters long',
  });
module.exports = {
  nameSchema,
};