const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {
  allProducts,
  allProductsDB,
  product,
  productDB,
  productFailed,
  productDBFailed,
} = require('../mocks/products.mock');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

const { expect } = chai;

chai.use(sinonChai);

describe('Products Controller', function () {
  it('Será validado que é possível listar todos os produtos', async function () {
    // arr
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(productsService, 'getAll')
      .resolves(allProductsDB);

    // act
    await productsController.getAllProducts(req, res);

    // ass
    expect(res.status).calledWith(200);
    expect(res.json).calledWith(allProducts);
  });

  it('Será validado que é possível listar um produto específico com sucesso', async function () {
    const req = {
      params: { id: 1 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(productsService, 'findById')
      .resolves(productDB);

    await productsController.getProductById(req, res);

    expect(res.status).calledWith(200);
    expect(res.json).calledWith(product);
  });

  it('Será validado que não é possível listar um produto que não existe', async function () {
    const req = {
      params: { id: 99 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(productsService, 'findById')
      .resolves(productDBFailed);

    await productsController.getProductById(req, res);

    expect(res.status).calledWith(404);
    expect(res.json).calledWith(productFailed);
  });

  afterEach(function () {
    sinon.restore();
  });
});