import { IProduct } from './../interfaces/IProduct';
import { NextFunction, Request, Response } from 'express';
import SearchProductsService from '../services/SearchProductsService';
import { reqSchema } from '../schemas/SearchProductsSchema';
import { ErrorTypes } from '../errors/catalog';

export default class SearchProductsController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: SearchProductsService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new SearchProductsService(reqSchema);
  }

  public async read() {
    try {
      const { query, category, store } = this.req.query;
      console.log(query, category, store);
      if (
        typeof query === 'string' &&
        typeof category === 'string' &&
        typeof store === 'string'
      ) {
        const response = await this.service.read({ query, category, store });
        return this.res.status(200).json(response);
      }
      throw new Error(ErrorTypes.MissingParameters);
    } catch (error) {
      this.next(error);
    }
  }
}
