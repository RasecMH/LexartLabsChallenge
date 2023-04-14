import { Model, models, Schema, model } from 'mongoose';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T[]): Promise<T[]> {
    return this.model.insertMany(obj);
  }

  public async read(
    query: string,
    category: string,
    store: string
  ): Promise<T[]> {
    this.schema.index({ description: 'text' });
    this.model.createIndexes();
    return this.model.find({
      $and: [{ $text: { $search: `${query}` } }, { category }, { store }],
    });
  }
}

export default AbstractODM;
