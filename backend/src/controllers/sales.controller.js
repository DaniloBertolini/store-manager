const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllSales = async (_req, res) => {
  const { codeStatus, data } = await salesService.getAll();
  res.status(mapStatusHTTP(codeStatus)).json(data);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { codeStatus, data } = await salesService.findById(id);

  res.status(mapStatusHTTP(codeStatus)).json(data);
};

const createSale = async (req, res) => {
  const { body } = req;
  const { codeStatus, data } = await salesService.create(body);

  res.status(mapStatusHTTP(codeStatus)).json(data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { codeStatus, data } = await salesService.remove(id);

  if (codeStatus !== 'NO_CONTENT') return res.status(mapStatusHTTP(codeStatus)).json(data);

  res.status(mapStatusHTTP(codeStatus)).end();
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  deleteSale,
};