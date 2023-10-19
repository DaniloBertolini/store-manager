const connection = require('./connection');
const { getAllSalesQuery, findByIdSalesQuery } = require('./querys/salesQuery');

const getAllModel = async () => {
  const [sales] = await connection.execute(getAllSalesQuery);
  
  return sales; 
};

const findByIdModel = async (id) => {
  const [sales] = await connection.execute(findByIdSalesQuery, [id]);

  return sales;
};

module.exports = {
  getAllModel,
  findByIdModel,
};