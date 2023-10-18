const connection = require('./connection');

const getAllModel = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const findByIdModel = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

module.exports = {
  getAllModel,
  findByIdModel,
};