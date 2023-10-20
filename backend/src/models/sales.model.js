const connection = require('./connection');
const {
  getAllSalesQuery,
  findByIdSalesQuery,
  createSalesQuery,
  insertItemsQuery,
} = require('./querys/salesQuery');

const getAllModel = async () => {
  const [sales] = await connection.execute(getAllSalesQuery);

  return sales; 
};

const findByIdModel = async (id) => {
  const [sales] = await connection.execute(findByIdSalesQuery, [id]);

  return sales;
};

const createModel = async () => {
  const [sales] = await connection.execute(createSalesQuery);

  return sales;
};

const insertItemsModel = async (saleId, productId, quantity) => {
  await connection.execute(insertItemsQuery, [saleId, productId, quantity]);
};

module.exports = {
  getAllModel,
  findByIdModel,
  createModel,
  insertItemsModel,
};