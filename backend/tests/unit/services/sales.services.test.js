const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {
  allSales,
  allSalesDB,
  salesById,
  salesByIdDB,
  saleDBFailed,
  saleCreate,
  saleCreated,
  saleFailedQuantity0,
  saleQuantityFailed,
  saleQuantityFailedMessage,
  saleFailedProductId,
  saleFailedProductIdMessage,
} = require('../mocks/sales.mock');

const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

const { expect } = chai;

chai.use(sinonChai);

describe('Sales Service', function () {
  describe('GET', function () {
    it('Será validado que é possível listar todas as vendas', async function () {
      sinon.stub(salesModel, 'getAllModel')
        .resolves(allSales);
      
      const sales = await salesService.getAll();
      
      expect(sales.codeStatus).equal(allSalesDB.codeStatus);
      expect(sales.data).deep.equal(allSalesDB.data);
    });

    it('Será validado que é possível listar uma venda específica com sucesso', async function () {
      sinon.stub(salesModel, 'findByIdModel')
        .resolves(salesById);
    
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

  describe('POST', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Será validado que é possível criar uma venda com sucesso', async function () {
      const { codeStatus, data } = saleCreated;
      sinon.stub(salesModel, 'createModel')
        .resolves({ insertId: 3 });
    
      const sales = await salesService.create(saleCreate);
    
      expect(sales.codeStatus).equal(codeStatus);
      expect(sales.data).deep.equal(data);
    });

    it('Será validado que não é possível criar uma venda com quantidade menor que 1', async function () {
      sinon.stub(salesModel, 'createModel')
        .resolves({ insertId: 3 });
    
      const sales = await salesService.create(saleFailedQuantity0);
    
      expect(sales.codeStatus).equal(saleQuantityFailed.codeStatus);
      expect(sales.data).deep.equal(saleQuantityFailedMessage);
    });

    it('Será validado que não é possível cadastrar uma venda com o campo productId inexistente, em uma requisição com vários items', async function () {
      const result = await salesService.create(saleFailedProductId);

      expect(result.codeStatus).equal('NOT_FOUND');
      expect(result.data).deep.equal(saleFailedProductIdMessage);
    });
  });

  describe('DELETE', function () {
    it('Será validado que é possível deletar uma venda com sucesso', async function () {
      sinon.stub(salesModel, 'findByIdModel')
        .resolves([salesById]);
      sinon.stub(salesModel, 'removeModel')
        .resolves();
    
      const sales = await salesService.remove(1);
    
      expect(sales.codeStatus).equal('NO_CONTENT');
    });

    it('Será validado que não é possível deletar uma venda que não existe', async function () {
      sinon.stub(salesModel, 'findByIdModel')
        .resolves([]);

      const sales = await salesService.remove(99);

      expect(sales.codeStatus).equal(saleDBFailed.codeStatus);
      expect(sales.data).deep.equal(saleDBFailed.data);
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});