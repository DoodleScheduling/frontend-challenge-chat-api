import { Request, Response } from 'express';

export const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
};

export const errorHandler = (err: Error, _req: Request, res: Response) => {
  console.error({
    message: err.message,
    stack: err.stack,
    name: err.name,
  });

  res.status(500).json({
    error: 'Internal Server Error',
  });
};
