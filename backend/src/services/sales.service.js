const { salesModel } = require('../models');

const getAll = async () => {
  const data = await salesModel.getAllModel();
  return { codeStatus: 'SUCCESSFUL', data };
};

const findById = async (id) => {
  const data = await salesModel.findByIdModel(id);

  if (data.length === 0) {
    return { codeStatus: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { codeStatus: 'SUCCESSFUL', data };
};

const create = async (itemsSold) => {
  const { insertId } = await salesModel.createModel();

  itemsSold.map(async (item) => {
    const { productId, quantity } = item;
    await salesModel.insertItemsModel(insertId, productId, quantity);
  });

  return { codeStatus: 'CREATED', data: { id: insertId, itemsSold } };
};

module.exports = {
  getAll,
  findById,
  create,
};