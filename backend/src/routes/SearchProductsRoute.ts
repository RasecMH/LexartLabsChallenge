import { Router } from 'express';
import SearchProductsController from '../controllers/SearchProductsController';

const routes = Router();

routes.get('/products/search', (req, res, next) =>
  new SearchProductsController(req, res, next).read()
);

export default routes;
