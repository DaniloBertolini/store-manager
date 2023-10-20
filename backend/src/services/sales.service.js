const { salesModel } = require('../models');

const validateIdExists = require('./validations/validateIdExists');

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
  const result = await validateIdExists(itemsSold);

  if (result.find((item) => item !== null)) {
    return result.find((item) => item !== null);
  }

  const { insertId } = await salesModel.createModel(itemsSold);
  const data = {
    id: insertId,
    itemsSold,
  };
  return { codeStatus: 'CREATED', data };
};

const remove = async (id) => {
  const [data] = await salesModel.findByIdModel(id);
  if (!data) {
    return {
      codeStatus: 'NOT_FOUND',
      data: { message: 'Sale not found' },
    };
  }
  await salesModel.removeModel(id);
  return { codeStatus: 'NO_CONTENT' };
};

module.exports = {
  getAll,
  findById,
  create,
  remove,
};