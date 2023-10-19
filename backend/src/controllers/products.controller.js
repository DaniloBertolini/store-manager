const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllProducts = async (_req, res) => {
  const { codeStatus, data } = await productsService.getAll();
  return res.status(mapStatusHTTP(codeStatus)).json(data);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { codeStatus, data } = await productsService.findById(id);

  res.status(mapStatusHTTP(codeStatus)).json(data);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { codeStatus, data } = await productsService.create(name);

  res.status(mapStatusHTTP(codeStatus)).json(data);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};