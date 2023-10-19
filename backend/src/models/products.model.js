const connection = require('./connection');
const { getAllProductsQuery, findByIdProductQuery } = require('./querys/productsQuery');

const getAllModel = async () => {
  const [products] = await connection.execute(getAllProductsQuery);
  return products;
};

const findByIdModel = async (id) => {
  const [product] = await connection.execute(findByIdProductQuery, [id]);
  return product;
};

module.exports = {
  getAllModel,
  findByIdModel,
};