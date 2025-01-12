import { Request, Response, NextFunction } from 'express';

const timeoutHandler = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.setTimeout(5000, () => {
    res.status(408).json({
      error: {
        message: 'Request Timeout',
        timestamp: new Date().toISOString(),
      },
    });
  });
  next();
};

export { timeoutHandler };
