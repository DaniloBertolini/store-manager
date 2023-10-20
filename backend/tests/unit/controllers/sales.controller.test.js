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
  saleCreate,
  saleCreated,
  saleCreatedReturn,
  saleQuantityFailed,
  saleQuantityFailedMessage,
} = require('../mocks/sales.mock');

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const validateCreateSales = require('../../../src/middlewares/validateCreateSales');

const { expect } = chai;

chai.use(sinonChai);

describe('Sales Controller', function () {
  describe('GET', function () {
    it('Será validado que é possível listar todos as vendas', async function () {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(salesService, 'getAll')
        .resolves(allSalesDB);
      
      await salesController.getAllSales(req, res);
      
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

  describe('POST', function () {
    it('Será validado que é possível criar uma venda com sucesso', async function () {
      const next = sinon.stub().returns();
      const req = {
        body: saleCreate,
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(salesService, 'create')
        .resolves(saleCreated);
      
      validateCreateSales(req, res, next);
      await salesController.createSale(req, res);

      expect(next).to.have.been.calledWith();
      expect(res.status).calledWith(201);
      expect(res.json).calledWith(saleCreatedReturn);
    });

    it('Será validado que não é possível cadastrar um produto sem o campo "productId"', async function () {
      const next = sinon.stub().returns();

      const req = {
        body: [
          {
            productId: 10,
          },
        ],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      validateCreateSales(req, res, next);

      expect(next).not.to.have.been.calledWith();
      expect(res.status).calledWith(400);
    });

    it('Será validado que não é possível cadastrar um produto sem o campo "quantity"', async function () {
      const next = sinon.stub().returns();
      
      const req = {
        body: [
          {
            productId: 10,
          },
        ],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      validateCreateSales(req, res, next);
      
      expect(next).not.to.have.been.calledWith();
      expect(res.status).calledWith(400);
    });

    it('Será validado que não é possível cadastrar um produto com o campo "quantity" igual à zero', async function () {
      const next = sinon.stub().returns();
      const req = {
        body: [
          {
            productId: 1,
            quantity: 0,
          },
        ],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(salesService, 'create')
        .resolves(saleQuantityFailed);

      validateCreateSales(req, res, next);
      await salesController.createSale(req, res);
      
      expect(next).to.have.been.calledWith();
      expect(res.status).calledWith(422);
      expect(res.json).calledWith(saleQuantityFailedMessage);
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});
