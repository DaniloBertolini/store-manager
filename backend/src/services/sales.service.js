const { salesModel } = require('../models');

const getAll = async () => {
  const data = await salesModel.getAllModel();
  return { codeStatus: 'SUCCESSFUL', data };
};

const findById = async (id) => {
  const [data] = await salesModel.findByIdModel(id);

  if (!data || data.length === 0) {
    console.log('entrou');
    return { codeStatus: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { codeStatus: 'SUCCESSFUL', data };
};

module.exports = {
  getAll,
  findById,
};