import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../types/index.js';

const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json({
    error: {
      message: 'Not Found',
      timestamp: new Date().toISOString(),
    },
  });
};

const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 'statusCode' in err ? err.statusCode : 500;

  console.error({
    message: err.message,
    stack: err.stack,
    name: err.name,
    statusCode,
    requestPath: req.path,
    requestQuery: req.query,
  });

  if (res.headersSent) {
    next(err);
    return;
  }

  res.status(statusCode).json({
    error: {
      message: statusCode === 500 ? 'Internal Server Error' : err.message,
      timestamp: new Date().toISOString(),
    },
  });
};

export { notFoundHandler, errorHandler };
