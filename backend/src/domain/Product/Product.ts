import { IProduct } from '../../interfaces/IProduct';

export default class Product {
  private id?: string | undefined;
  private image: string;
  private description: string;
  private category: string;
  private price: number;
  private store: string;
  private url: string;

  constructor(product: IProduct) {
    this.id = product.id;
    this.image = product.image;
    this.description = product.description;
    this.category = product.category;
    this.price = product.price;
    this.store = product.store;
    this.url = product.url;
  }

  public setId(id: string) {
    this.id = id;
  }

  public getId() {
    return this.id;
  }

  public setImage(image: string) {
    this.image = image;
  }

  public getImage() {
    return this.image;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public getDescription() {
    return this.description;
  }

  public setCategory(category: string) {
    this.category = category;
  }

  public getCategory() {
    return this.category;
  }

  public setPrice(price: number) {
    this.price = price;
  }

  public getPrice() {
    return this.price;
  }

  public setStore(store: string) {
    this.store = store;
  }

  public getStore() {
    return this.store;
  }

  public setUrl(url: string) {
    this.url = url;
  }

  public getUrl() {
    return this.url;
  }
}
