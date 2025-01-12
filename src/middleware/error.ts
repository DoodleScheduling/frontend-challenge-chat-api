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
  console.error({
    message: err.message,
    stack: err.stack,
    name: err.name,
    statusCode: 'statusCode' in err ? err.statusCode : 500,
  });

  // Prevent "Cannot set headers after they are sent" error
  // This happens if response headers were already sent (e.g. streaming response or multiple handlers)
  // Pass to next error handler instead of attempting another response
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    error: {
      message: 'Internal Server Error',
      timestamp: new Date().toISOString(),
    },
  });
};

export { notFoundHandler, errorHandler };
