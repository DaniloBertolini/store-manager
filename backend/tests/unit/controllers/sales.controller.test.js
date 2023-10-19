const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {
  allSales,
  allSalesDB,
  salesById,
  salesByIdDB,
  saleFailed,
  saleDBFailed,
} = require('../mocks/sales.mock');

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');

const { expect } = chai;

chai.use(sinonChai);

describe('Sales Controller', function () {
  it('Será validado que é possível listar todos as vendas', async function () {
    // arr
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(salesService, 'getAll')
      .resolves(allSalesDB);

    // act
    await salesController.getAllSales(req, res);

    // ass
    expect(res.status).calledWith(200);
    expect(res.json).calledWith(allSales);
  });

  it('Será validado que é possível listar uma venda específica com sucesso', async function () {
    const req = {
      params: { id: 1 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(salesService, 'findById')
      .resolves(salesByIdDB);

    await salesController.getSaleById(req, res);

    expect(res.status).calledWith(200);
    expect(res.json).calledWith(salesById);
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
    sinon.stub(salesService, 'findById')
      .resolves(saleDBFailed);

    await salesController.getSaleById(req, res);

    expect(res.status).calledWith(404);
    expect(res.json).calledWith(saleFailed);
  });

  afterEach(function () {
    sinon.restore();
  });
});
