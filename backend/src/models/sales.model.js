const connection = require('./connection');
const { getAllSalesQuery, findByIdSalesQuery } = require('./querys/salesQuery');

const getAllModel = async () => {
  const [sales] = await connection.execute(getAllSalesQuery);

  return sales.map((item) => ({
    saleId: item.sale_id,
    date: item.date,
    productId: item.product_id,
    quantity: item.quantity,
  }));
};

const findByIdModel = async (id) => {
  const [sales] = await connection.execute(findByIdSalesQuery, [id]);
  
  return sales.map((item) => ({
    date: item.date,
    productId: item.product_id,
    quantity: item.quantity,
  }));
};

module.exports = {
  getAllModel,
  findByIdModel,
};