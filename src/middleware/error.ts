import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../types';

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
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error details
  console.error({
    message: err.message,
    stack: err.stack,
    name: err.name,
    statusCode: 'statusCode' in err ? err.statusCode : 500,
  });

  // Don't send response if headers already sent
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = 'statusCode' in err ? err.statusCode : 500;

  res.status(statusCode).json({
    error: {
      message: statusCode === 500 ? 'Internal Server Error' : err.message,
      timestamp: new Date().toISOString(),
    },
  });
};

export { notFoundHandler, errorHandler };
