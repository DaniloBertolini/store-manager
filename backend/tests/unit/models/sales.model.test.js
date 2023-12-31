const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { allSales, salesById, saleCreate } = require('../mocks/sales.mock');

const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const { expect } = chai;

chai.use(sinonChai);

describe('Sales Model', function () {
  describe('GET', function () {
    it('Será validado que é possível listar todas as vendas', async function () {
      sinon.stub(connection, 'execute')
        .resolves([allSales]);
      
      const response = await salesModel.getAllModel();
      
      expect(response).deep.equal(allSales);
    });

    it('Será validado que é possível listar vendas pelo ID com sucesso', async function () {
      sinon.stub(connection, 'execute')
        .resolves([salesById]);

      const response = await salesModel.findByIdModel(1);
    
      expect(response).deep.equal(salesById);
    });

    it('Será validado que não é possível listar uma venda que não existe', async function () {
      sinon.stub(connection, 'execute')
        .resolves([[]]);

      const response = await salesModel.findByIdModel(99);

      expect(response).deep.equal([]);
    });
  
    afterEach(function () {
      sinon.restore();
    });
  });

  describe('POST', function () {
    it('Será validado que é possível criar uma venda com sucesso', async function () {
      const insertId = 1;

      sinon.stub(connection, 'execute')
        .onFirstCall()
        .resolves([{ insertId }])
        .onSecondCall()
        .resolves();

      const response = await salesModel.createModel(saleCreate);

      expect(response).deep.equal({ insertId });
    });

    afterEach(function () {
      sinon.restore();
    });
  });
  
  describe('DELETE', function () {
    it('Será validado que é possível deletar uma venda com sucesso', async function () {
      const conn = sinon.stub(connection, 'execute')
        .resolves();

      await salesModel.removeModel(1);

      expect(conn).have.calledWith();
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});