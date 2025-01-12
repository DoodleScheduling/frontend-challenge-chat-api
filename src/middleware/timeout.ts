import { Request, Response, NextFunction } from 'express';

import { ApiError } from '../types';
import { CONFIG } from '../config';

const timeoutHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const createTimeoutError = (): ApiError => {
    const error = new Error('Request Timeout') as ApiError;
    error.statusCode = 408;
    return error;
  };

  const timeoutId = setTimeout(() => {
    if (!res.headersSent) {
      const error = createTimeoutError();
      next(error);
    }
  }, CONFIG.api.timeoutErrorDelay);

  // Clear timeout when response is sent
  res.on('finish', () => {
    clearTimeout(timeoutId);
  });

  // Clear timeout if there's an error
  res.on('error', () => {
    clearTimeout(timeoutId);
  });

  next();
};

export { timeoutHandler };
