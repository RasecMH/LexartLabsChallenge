import Product from '../domain/Product/Product';
import { IProduct } from '../interfaces/IProduct';
import SearchProductsODM from '../models/SearchProductsODM';
import { ErrorTypes } from '../errors/catalog';
import { Schema } from 'joi';
import { ISearchReq } from '../interfaces/ISearchReq';
import Scraper from '../utils/Scraper';

export default class SearchProductsService {
  constructor(private _schema: Schema) {}

  private createProductDomain(product: IProduct): Product {
    return new Product(product);
  }

  private validateFields(toValidate: ISearchReq) {
    const parsed = this._schema.validate(toValidate);
    if (parsed.error) throw new Error(ErrorTypes.MissingParameters);
  }

  public async read({
    query,
    category,
    store,
  }: ISearchReq): Promise<Product[] | []> {
    this.validateFields({ query, category, store });

    const result: Product[] = [];
    if (store === 'Mercado Livre' || store === 'Todas') {
      const MLProducts = await this.getFromMercadoLivre(query, category);

      MLProducts.forEach((item: Product) => result.push(item));
    }

    if (store === 'Buscapé' || store === 'Todas') {
      const BuscapeProducts = await this.getFromBuscape(query, category);

      BuscapeProducts.forEach((item: Product) => result.push(item));
    }

    return result;
  }

  private async getFromDb(query: string, category: string, store: string) {
    const db = new SearchProductsODM();
    const dbResults = await db.read(category, store);
    return dbResults.filter(
      (item) =>
        item.description
          .toLowerCase()
          .split(' ')
          .filter((e) => query.split(' ').includes(e)).length
    );
  }

  private async getFromMercadoLivre(
    query: string,
    category: string
  ): Promise<Product[] | []> {
    const db = new SearchProductsODM();

    const dbResults = await this.getFromDb(query, category, 'Mercado Livre');
    if (dbResults.length > 0) {
      console.log('Mercado Livre db');
      return dbResults.map((item: IProduct) => this.createProductDomain(item));
    }

    const scraper = new Scraper();
    const productList = await scraper.MercadoLivreScraper(query, category);
    if (productList.length > 0) {
      console.log('Mercado Livre scraper');
      const result = await db.create(productList);
      return result.map((item: IProduct) => this.createProductDomain(item));
    }

    return [];
  }

  private async getFromBuscape(
    query: string,
    category: string
  ): Promise<Product[] | []> {
    const db = new SearchProductsODM();

    const dbResults = await this.getFromDb(query, category, 'Buscapé');
    if (dbResults.length > 0) {
      console.log('Buscapé db');
      return dbResults.map((item: IProduct) => this.createProductDomain(item));
    }

    const scraper = new Scraper();
    const productList = await scraper.BuscapeScraper(query, category);
    if (productList.length > 0) {
      console.log('Buscapé scraper');
      const result = await db.create(productList);
      return result.map((item: IProduct) => this.createProductDomain(item));
    }
    return [];
  }
}
