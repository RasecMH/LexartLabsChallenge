import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import SearchProductsService from '../../../src/services/SearchProductsService';
import { productListMock } from '../mock/searchProducts.mock';

describe('It should return the searched product list', function () {
  it('Should throw an error if the search parameters are outside the required', async function () {
    try {
      const service = new SearchProductsService();
      await service.read({ query: '' });
    } catch (error) {
      expect((error as Error).message).to.be.equal(
        'Missing required parameters'
      );
    }
  });

  it('Should return a product list from all stores', async function () {
    const searchInput = {
      query: 'geladeira',
      category: 'geladeira',
      store: '',
    };

    sinon.stub(Model, 'find').resolves(productListMock);

    const service = new SearchProductsService();
    const productList = await service.read(searchInput);

    expect(productList).to.be.deep.equal(productListMock);
  });

  it('Should return a product list from Mercado Livre', async function () {
    const searchInput = {
      query: 'geladeira',
      category: 'geladeira',
      store: 'Mercado Livre',
    };

    sinon.stub(Model, 'find').resolves([productListMock[0]]);

    const service = new SearchProductsService();
    const productList = await service.read(searchInput);

    expect(productList).to.be.deep.equal([productListMock[0]]);
  });

  it('Should return a product list from Buscapé', async function () {
    const searchInput = {
      query: 'geladeira',
      category: 'geladeira',
      store: 'Buscapé',
    };

    sinon.stub(Model, 'find').resolves([productListMock[1]]);

    const service = new SearchProductsService();
    const productList = await service.read(searchInput);

    expect(productList).to.be.deep.equal([productListMock[1]]);
  });

  afterEach(function () {
    sinon.restore();
  });
});
