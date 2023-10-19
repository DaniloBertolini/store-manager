const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {
  allSales,
  allSalesDB,
  salesById,
  salesByIdDB,
  saleDBFailed,
} = require('../mocks/sales.mock');

const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

const { expect } = chai;

chai.use(sinonChai);

describe('Sales Service', function () {
  it('Será validado que é possível listar todas as vendas', async function () {
    sinon.stub(salesModel, 'getAllModel')
      .resolves(allSales);
    
    const sales = await salesService.getAll();

    expect(sales.codeStatus).equal(allSalesDB.codeStatus);
    expect(sales.data).deep.equal(allSalesDB.data);
  });

  it('Será validado que é possível listar uma venda específica com sucesso', async function () {
    sinon.stub(salesModel, 'findByIdModel')
      .resolves([salesById]);

    const sales = await salesService.findById(1);

    expect(sales.codeStatus).equal(salesByIdDB.codeStatus);
    expect(sales.data).deep.equal(salesByIdDB.data);
  });

  it('Será validado que não é possível listar uma venda que não existe', async function () {
    sinon.stub(salesModel, 'findByIdModel')
      .resolves([]);

    const sales = await salesService.findById(99);

    expect(sales.codeStatus).equal(saleDBFailed.codeStatus);
    expect(sales.data).deep.equal(saleDBFailed.data);
  });

  afterEach(function () {
    sinon.restore();
  });
});