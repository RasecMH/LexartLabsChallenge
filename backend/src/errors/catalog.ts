export enum ErrorTypes {
  MissingParameters = 'MissingParameters',
  DataAlreadyRegistred = 'DataAlreadyRegistred',
  NotFoundError = 'NotFoundError',
}

type ErrorResponseObject = {
  message: string;
  httpStatus: number;
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject;
};

export const errorCatalog: ErrorCatalog = {
  MissingParameters: {
    message: 'Missing required parameters',
    httpStatus: 400,
  },
  DataAlreadyRegistred: {
    message: 'Data already registred',
    httpStatus: 409,
  },
  NotFoundError: {
    message: 'Object not found',
    httpStatus: 404,
  },
};
