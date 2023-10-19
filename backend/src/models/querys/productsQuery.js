module.exports = {
  getAllProductsQuery: 'SELECT * FROM products',
  findByIdProductQuery: 'SELECT * FROM products WHERE id = ?',
  createProductQuery: 'INSERT INTO products (name) VALUES (?)',
};