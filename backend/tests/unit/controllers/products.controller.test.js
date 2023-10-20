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
  productCreated,
  productDBCreated,
  productCreatedSuccessful,
} = require('../mocks/products.mock');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const validateCreateProducts = require('../../../src/middlewares/validateCreateProduct');

const { expect } = chai;

chai.use(sinonChai);

describe('Products Controller', function () {
  describe('GET', function () {
    it('Será validado que é possível listar todos os produtos', async function () {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(productsService, 'getAll')
        .resolves(allProductsDB);

      await productsController.getAllProducts(req, res);

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

  describe('POST', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Será validado que é possível cadastrar um produto com sucesso', async function () {
      const next = sinon.stub().returns();
      const req = {
        body: { name: 'Teclado' },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(productsService, 'create')
        .resolves(productDBCreated);

      validateCreateProducts(req, res, next);
      await productsController.createProduct(req, res);

      expect(next).to.have.been.calledWith();
      expect(res.status).calledWith(201);
      expect(res.json).calledWith(productCreated);
    });
    
    it('Será validado que não é possível cadastrar um produto sem o campo "name"', async function () {
      const next = sinon.stub().returns();
      
      const req = {
        body: { },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      
      validateCreateProducts(req, res, next);
      
      expect(next).not.to.have.been.calledWith();
      expect(res.status).calledWith(400);
    });
  });

  describe('PUT', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Será validado que é possível atualizar um produto com sucesso', async function () {
      const next = sinon.stub().returns();

      const req = {
        params: {
          id: 4,
        },
        body: {
          name: 'Teclado',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(productsService, 'update')
        .resolves(productCreatedSuccessful);
      
      validateCreateProducts(req, res, next);
      await productsController.updateProduct(req, res);

      expect(next).to.have.been.calledWith();
      expect(res.status).calledWith(200);
      expect(res.json).calledWith(productCreated);
    });

    it('Será validado que não é possível cadastrar um produto sem o campo "name"', async function () {
      const next = sinon.stub().returns();
      
      const req = {
        body: { },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      
      validateCreateProducts(req, res, next);
      
      expect(next).not.to.have.been.calledWith();
      expect(res.status).calledWith(400);
    });
  });

  describe('DELETE', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Será validado que é possível deletar um produto com sucesso', async function () {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        end: sinon.stub(),
      };

      sinon.stub(productsService, 'remove')
        .resolves({ codeStatus: 'NO_CONTENT' });

      await productsController.deleteProduct(req, res);

      expect(res.status).calledWith(204);
      expect(res.end).calledWith();
    });
  });
});