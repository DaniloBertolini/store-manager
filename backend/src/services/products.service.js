const { productsModel } = require('../models');

const getAll = async () => {
  const data = await productsModel.getAllModel();
  return { codeStatus: 'SUCCESSFUL', data };
};

const findById = async (id) => {
  const data = await productsModel.findByIdModel(id);
  if (!data) return { codeStatus: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { codeStatus: 'SUCCESSFUL', data };
};

const create = async (name) => {
  const productId = await productsModel.createModel(name);

  const data = await productsModel.findByIdModel(productId);
  return { codeStatus: 'CREATED', data };
};

module.exports = {
  getAll,
  findById,
  create,
};