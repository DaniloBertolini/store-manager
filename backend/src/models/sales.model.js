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

const createModel = async (itemsSold) => {
  const [sales] = await connection.execute(createSalesQuery);

  await Promise.all(itemsSold.map(async (item) => {
    const { productId, quantity } = item;
    await connection.execute(insertItemsQuery, [sales.insertId, productId, quantity]);
  }));

  return sales;
};

module.exports = {
  getAllModel,
  findByIdModel,
  createModel,
};