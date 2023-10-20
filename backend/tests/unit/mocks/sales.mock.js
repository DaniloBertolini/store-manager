const dateString = '2023-10-18T23:48:55.000Z';

const allSales = [
  {
    saleId: 1,
    date: dateString,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: dateString,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: dateString,
    productId: 3,
    quantity: 15,
  },
];

const salesById = [
  {
    saleId: 1,
    date: dateString,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: dateString,
    productId: 2,
    quantity: 10,
  },
];

const saleFailed = {
  message: 'Sale not found',
};

const allSalesDB = {
  codeStatus: 'SUCCESSFUL',
  data: allSales,
};

const saleCreate = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const saleFailedProductId = [
  {
    productId: 99,
    quantity: 1,
  },
];

const saleFailedProductIdMessage = {
  message: 'Product not found',
};

const saleFailedQuantity0 = [
  {
    productId: 1,
    quantity: 0,
  },
];

const saleCreatedReturn = {
  id: 3,
  itemsSold: saleCreate,
};

const saleCreated = {
  codeStatus: 'CREATED',
  data: saleCreatedReturn,
};

const saleQuantityFailedMessage = {
  message: '"quantity" must be greater than or equal to 1',
};

const saleQuantityFailed = {
  codeStatus: 'INVALID_VALUE',
  data: saleQuantityFailedMessage,
};

const salesByIdDB = {
  codeStatus: 'SUCCESSFUL',
  data: salesById,
};

const saleDBFailed = {
  codeStatus: 'NOT_FOUND',
  data: { message: 'Sale not found' },
};

module.exports = {
  allSales,
  allSalesDB,
  salesById,
  salesByIdDB,
  saleFailed,
  saleDBFailed,
  saleCreate,
  saleCreatedReturn,
  saleCreated,
  saleQuantityFailed,
  saleQuantityFailedMessage,
  saleFailedQuantity0,
  saleFailedProductId,
  saleFailedProductIdMessage,
};