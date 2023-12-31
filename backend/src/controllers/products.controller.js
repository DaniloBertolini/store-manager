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

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { codeStatus, data } = await productsService.update(id, name);

  res.status(mapStatusHTTP(codeStatus)).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { codeStatus, data } = await productsService.remove(id);

  if (codeStatus !== 'NO_CONTENT') return res.status(mapStatusHTTP(codeStatus)).json(data);

  res.status(mapStatusHTTP(codeStatus)).end();
};

const getProductByName = async (req, res) => {
  const { q } = req.query;
  const { codeStatus, data } = await productsService.findByName(q);

  res.status(mapStatusHTTP(codeStatus)).json(data);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
};