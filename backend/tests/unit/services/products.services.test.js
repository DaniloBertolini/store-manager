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
} = require('../mocks/products.mock');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

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
        .resolves(product);

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
        .resolves(productCreated);

      const prod = await productsService.create('Teclado');
      
      expect(prod.codeStatus).equal('CREATED');
      expect(prod.data).deep.equal(productCreated);
    });
  });
});