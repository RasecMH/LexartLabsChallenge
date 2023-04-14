import { Schema } from 'mongoose';
import AbstractODM from './AbstractODM';
import { IProduct } from '../interfaces/IProduct';

export default class SearchProductsODM extends AbstractODM<IProduct> {
  constructor() {
    const schema = new Schema<IProduct>({
      image: { type: String, required: true },
      description: { type: String, required: true, index: true },
      category: { type: String, required: true },
      price: { type: Number, required: true },
      store: { type: String, required: true },
      url: { type: String, required: true },
    });
    super(schema, 'SearchProducts');
    schema.index({ description: 'text' });
    this.model.ensureIndexes();
  }
}
