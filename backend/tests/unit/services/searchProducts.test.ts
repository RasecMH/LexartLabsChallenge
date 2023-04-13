import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import SearchProductsService from '../../../src/services/SearchProductsService';
import { productListMock } from '../mock/searchProducts.mock';
import { reqSchema } from '../../../src/schemas/SearchProductsSchema';
import Scraper from '../../../src/utils/Scraper';
import axios from 'axios';

describe('It should return the searched product list', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Should throw an error if the search parameters are outside the required', async function () {
    try {
      const service = new SearchProductsService(reqSchema);
      await service.read({ query: '', category: '', store: '' });
    } catch (error) {
      expect((error as Error).message).to.be.equal('MissingParameters');
    }
  });

  it('Should return a product list from all stores', async function () {
    sinon
      .stub(Model, 'find')
      .onCall(0)
      .resolves([productListMock[0]])
      .onCall(1)
      .resolves([productListMock[1]]);

    const params = {
      query: 'branca',
      category: 'geladeira',
      store: 'all',
    };

    const service = new SearchProductsService(reqSchema);
    const productList = await service.read(params);

    expect(productList).to.be.deep.equal(productListMock);
  });

  it('Should return a product list from Mercado Livre', async function () {
    sinon.stub(Model, 'find').resolves([productListMock[0]]);
    const params = {
      query: 'branca',
      category: 'geladeira',
      store: 'Mercado Livre',
    };

    const service = new SearchProductsService(reqSchema);
    const productList = await service.read(params);

    expect(productList).to.be.deep.equal([productListMock[0]]);
  });

  it('Should return a product list scraped from Mercado Livre', async function () {
    sinon.stub(Model, 'find').resolves([]);
    sinon
      .stub(Scraper.prototype, 'MercadoLivreScraper')
      .resolves(productListMock);
    sinon.stub(Model, 'insertMany').resolves([productListMock[0]]);

    const params = {
      query: 'branca',
      category: 'geladeira',
      store: 'Mercado Livre',
    };

    const service = new SearchProductsService(reqSchema);
    const productList = await service.read(params);

    expect(productList).to.be.deep.equal([productListMock[0]]);
  });

  it('Should return a empty array if nothing found in Mercado Livre', async function () {
    sinon.stub(Model, 'find').resolves([]);
    sinon.stub(Scraper.prototype, 'MercadoLivreScraper').resolves([]);

    const params = {
      query: 'branca',
      category: 'geladeira',
      store: 'Mercado Livre',
    };

    const service = new SearchProductsService(reqSchema);
    const productList = await service.read(params);

    expect(productList).to.be.deep.equal([]);
  });

  it('Should return a product list from Buscapé', async function () {
    sinon.stub(Model, 'find').resolves([productListMock[1]]);
    const params = {
      query: 'branca',
      category: 'geladeira',
      store: 'Buscape',
    };

    const service = new SearchProductsService(reqSchema);
    const productList = await service.read(params);

    expect(productList).to.be.deep.equal([productListMock[1]]);
  });

  it('Should return a product list scraped from Buscapé', async function () {
    sinon.stub(Model, 'find').resolves([]);
    sinon.stub(Scraper.prototype, 'BuscapeScraper').resolves(productListMock);
    sinon.stub(Model, 'insertMany').resolves([productListMock[1]]);

    const params = {
      query: 'branca',
      category: 'geladeira',
      store: 'Buscape',
    };

    const service = new SearchProductsService(reqSchema);
    const productList = await service.read(params);

    expect(productList).to.be.deep.equal([productListMock[1]]);
  });

  it('Should return a empty array if nothing found in Buscapé', async function () {
    sinon.stub(Model, 'find').resolves([]);
    sinon.stub(Scraper.prototype, 'BuscapeScraper').resolves([]);

    const params = {
      query: 'branca',
      category: 'geladeira',
      store: 'Buscape',
    };

    const service = new SearchProductsService(reqSchema);
    const productList = await service.read(params);

    expect(productList).to.be.deep.equal([]);
  });
});
