import express, { Request, Response } from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import SearchProductsRoute from './routes/SearchProductsRoute';
import ErrorMiddleware from './middlewares/ErrorMiddleware';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (_req: Request, res: Response) =>
  res.status(StatusCodes.OK).send('Ok')
);

app.use(SearchProductsRoute);
app.use(ErrorMiddleware);

export default app;
