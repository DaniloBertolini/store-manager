const allProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const product = {
  id: 1,
  name: 'Martelo de Thor',
};

const productFailed = {
  message: 'Product not found',
};

const allProductsDB = {
  codeStatus: 'SUCCESSFUL',
  data: allProducts,
};

const productDB = {
  codeStatus: 'SUCCESSFUL',
  data: product,
};

const productCreated = {
  id: 4,
  name: 'Teclado',
};

const productDBCreated = {
  codeStatus: 'CREATED',
  data: productCreated,
};

const productDBFailed = {
  codeStatus: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

module.exports = {
  allProducts,
  allProductsDB,
  product,
  productDB,
  productFailed,
  productDBFailed,
  productCreated,
  productDBCreated,
};