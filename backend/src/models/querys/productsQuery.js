module.exports = {
  getAllProductsQuery: 'SELECT * FROM products',
  findByIdProductQuery: 'SELECT * FROM products WHERE id = ?',
  createProductQuery: 'INSERT INTO products (name) VALUES (?)',
  updateProductQuery: 'UPDATE products SET name = ? WHERE id = ?',
  deleteProductQuery: 'DELETE FROM products WHERE id = ?',
  findByNameProductQuery: 'SELECT * FROM products WHERE name LIKE ?',
};