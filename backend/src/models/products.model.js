const connection = require('./connection');
const {
  getAllProductsQuery,
  findByIdProductQuery,
  createProductQuery,
  updateProductQuery,
} = require('./querys/productsQuery');

const getAllModel = async () => {
  const [products] = await connection.execute(getAllProductsQuery);
  return products;
};

const findByIdModel = async (id) => {
  const [product] = await connection.execute(findByIdProductQuery, [id]);
  return product;
};

const createModel = async (name) => {
  const [product] = await connection.execute(createProductQuery, [name]);

  return product.insertId;
};

const updateModel = async (id, name) => {
  const [product] = await connection.execute(updateProductQuery, [name, id]);

  return product.insertId;
};

module.exports = {
  getAllModel,
  findByIdModel,
  createModel,
  updateModel,
};