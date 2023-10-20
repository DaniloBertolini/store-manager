const { productsModel } = require('../models');
const { nameSchema } = require('./validations/schemas');

const getAll = async () => {
  const data = await productsModel.getAllModel();
  return { codeStatus: 'SUCCESSFUL', data };
};

const findById = async (id) => {
  const [data] = await productsModel.findByIdModel(id);
  if (!data) {
    return {
      codeStatus: 'NOT_FOUND',
      data: { message: 'Product not found' },
    }; 
  }
  return { codeStatus: 'SUCCESSFUL', data };
};

const create = async (name) => {
  const { error } = nameSchema.validate(name);
  if (error) return { codeStatus: 'INVALID_VALUE', data: { message: error.message } };

  const productId = await productsModel.createModel(name);

  const [data] = await productsModel.findByIdModel(productId);
  return { codeStatus: 'CREATED', data };
};

const update = async (id, name) => {
  const { error } = nameSchema.validate(name);
  if (error) return { codeStatus: 'INVALID_VALUE', data: { message: error.message } };
  const [data] = await productsModel.findByIdModel(id);
  if (!data) {
    return {
      codeStatus: 'NOT_FOUND',
      data: { message: 'Product not found' },
    }; 
  }
  await productsModel.updateModel(id, name);

  const [dataResponse] = await productsModel.findByIdModel(id);
  return { codeStatus: 'SUCCESSFUL', data: dataResponse };
};

const remove = async (id) => {
  const [data] = await productsModel.findByIdModel(id);
  if (!data) {
    return {
      codeStatus: 'NOT_FOUND',
      data: { message: 'Product not found' },
    }; 
  }
  await productsModel.removeModel(id);
  return { codeStatus: 'NO_CONTENT' };
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};