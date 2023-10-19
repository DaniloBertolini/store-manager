const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {
  allProducts,
  product,
} = require('../mocks/products.mock');
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const { expect } = chai;

chai.use(sinonChai);

describe('Products Model', function () {
  it('Será validado que é possível listar todos os produtos', async function () {
    sinon.stub(connection, 'execute')
      .resolves([allProducts]);

    const response = await productsModel.getAllModel();

    expect(response).deep.equal(allProducts);
  });

  it('Será validado que é possível listar um produto específico com sucesso', async function () {
    sinon.stub(connection, 'execute')
      .resolves([product]);

    const response = await productsModel.findByIdModel(1);

    expect(response).deep.equal(product);
  });

  it('Será validado que não é possível listar um produto que não existe', async function () {
    sinon.stub(connection, 'execute')
      .resolves([]);

    const response = await productsModel.findByIdModel(99);

    expect(response).deep.equal(undefined);
  });

  afterEach(function () {
    sinon.restore();
  });
});