import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { errorCatalog, ErrorTypes } from '../errors/catalog';

const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const messageAsErrorType = err.message as keyof typeof ErrorTypes;

  const mappedError = errorCatalog[messageAsErrorType];

  if (mappedError) {
    const { httpStatus, message } = mappedError;
    console.error(err);
    return res.status(httpStatus).json({ error: message });
  }

  console.error(err);
  return res.status(500).json({ error: 'Internal error server' });
};

export default errorMiddleware;
