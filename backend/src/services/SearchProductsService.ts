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
      console.log(MLProducts[0]);

      MLProducts.forEach((item: Product) => result.push(item));
    }

    if (store === 'Buscapé' || store === 'Todas') {
      const BuscapeProducts = await this.getFromBuscape(query, category);
      console.log(BuscapeProducts[0]);

      BuscapeProducts.forEach((item: Product) => result.push(item));
    }

    return result;
  }

  private async getFromMercadoLivre(
    query: string,
    category: string
  ): Promise<Product[] | []> {
    const db = new SearchProductsODM();

    const dbResults = await db.read(query, category, 'Mercado Livre');
    if (dbResults.length > 0) {
      return dbResults.map((item: IProduct) => this.createProductDomain(item));
    }

    const scraper = new Scraper();
    const productList = await scraper.MercadoLivreScraper(query, category);
    if (productList.length > 0) {
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

    const dbResults = await db.read(query, category, 'Buscape');

    if (dbResults.length > 0) {
      return dbResults.map((item: IProduct) => this.createProductDomain(item));
    }

    const scraper = new Scraper();
    const productList = await scraper.BuscapeScraper(query, category);
    if (productList.length > 0) {
      const result = await db.create(productList);
      return result.map((item: IProduct) => this.createProductDomain(item));
    }
    return [];
  }
}
