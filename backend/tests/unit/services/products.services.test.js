const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {
  allProducts,
  allProductsDB,
  product,
  productDB,
  productDBFailed,
  productCreated,
  productUpdate,
  productUpdateFailed,
} = require('../mocks/products.mock');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { nameSchema } = require('../../../src/services/validations/schemas');

const { expect } = chai;

chai.use(sinonChai);

describe('Products Service', function () {
  describe('GET', function () {
    it('Será validado que é possível listar todos os produtos', async function () {
      sinon.stub(productsModel, 'getAllModel')
        .resolves(allProducts);
    
      const prod = await productsService.getAll();
      
      expect(prod.codeStatus).equal(allProductsDB.codeStatus);
      expect(prod.data).deep.equal(allProductsDB.data);
    });

    it('Será validado que é possível listar um produto específico com sucesso', async function () {
      sinon.stub(productsModel, 'findByIdModel')
        .resolves([product]);

      const prod = await productsService.findById(1);
      
      expect(prod.codeStatus).equal(productDB.codeStatus);
      expect(prod.data).deep.equal(productDB.data);
    });

    it('Será validado que não é possível listar um produto que não existe', async function () {
      sinon.stub(productsModel, 'findByIdModel')
        .resolves([]);
      
      const prod = await productsService.findById(99);
    
      expect(prod.codeStatus).equal(productDBFailed.codeStatus);
      expect(prod.data).deep.equal(productDBFailed.data);
    });
  
    afterEach(function () {
      sinon.restore();
    });
  });

  describe('POST', function () {
    it('Será validado que é possível criar um produto com sucesso', async function () {
      sinon.stub(productsModel, 'createModel')
        .resolves(4);
      sinon.stub(productsModel, 'findByIdModel')
        .resolves([productCreated]);

      const prod = await productsService.create('Teclado');
      
      expect(prod.codeStatus).equal('CREATED');
      expect(prod.data).deep.equal(productCreated);
    });

    it('Será validado que não é possível cadastrar um produto com o campo "name" menor que 5 caracteres', async function () {      
      const nameTest = 'name';

      sinon.stub(nameSchema, 'validate').returns({ error: { message: '"name" length must be at least 5 characters long' } });

      const productFailed = await productsService.create(nameTest);

      expect(nameSchema.validate).to.have.been.calledWith(nameTest);
      expect(productFailed.codeStatus).equal('INVALID_VALUE');
      expect(productFailed.data.message).equal('"name" length must be at least 5 characters long');
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('PUT', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('Será validado que é possível atualizar um produto com sucesso', async function () {
      sinon.stub(productsModel, 'findByIdModel')
        .onFirstCall()
        .resolves([product])
        .onSecondCall()
        .resolves([productUpdate]);

      sinon.stub(productsModel, 'updateModel')
        .resolves();

      const prod = await productsService.update(1, 'Lapis');
      
      expect(prod.codeStatus).equal('SUCCESSFUL');
      expect(prod.data).deep.equal(productUpdate);
    });

    it('Será validado que não é possível atualizar um produto que não existe', async function () {
      const { id, name } = productUpdateFailed;
      sinon.stub(productsModel, 'findByIdModel')
        .resolves([]);

      const prod = await productsService.update(id, name);
    
      expect(prod.codeStatus).equal(productDBFailed.codeStatus);
      expect(prod.data).deep.equal(productDBFailed.data);
    });

    it('Será validado que não é possível atualizar um produto com o campo "name" menor que 5 caracteres', async function () {
      const { id } = productUpdateFailed;
      const nameTest = 'name';

      sinon.stub(nameSchema, 'validate').returns({ error: { message: '"name" length must be at least 5 characters long' } });

      const productFailed = await productsService.update(id, nameTest);

      expect(nameSchema.validate).to.have.been.calledWith(nameTest);
      expect(productFailed.codeStatus).equal('INVALID_VALUE');
      expect(productFailed.data.message).equal('"name" length must be at least 5 characters long');
    });
  });
});