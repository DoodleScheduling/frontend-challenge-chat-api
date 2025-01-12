import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const validateBody = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req.body);
      req.body = result;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error({
          message: 'Invalid message format',
          details: error.errors,
          statusCode: 400,
          requestPath: req.path,
          stack: error.stack,
        });
        res.status(400).json({
          error: 'Invalid message format',
          details: error.errors,
        });
        return;
      }
      next(error);
    }
  };
};

const validateQuery = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req.query);
      req.query = result;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error({
          message: 'Invalid query parameters',
          details: error.errors,
          statusCode: 400,
          requestPath: req.path,
          stack: error.stack,
        });
        res.status(400).json({
          error: 'Invalid query parameters',
          details: error.errors,
        });
        return;
      }
      next(error);
    }
  };
};

export { validateBody, validateQuery };
