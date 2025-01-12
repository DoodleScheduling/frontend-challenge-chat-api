import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const validateBody = (schema: z.ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedError = {
          statusCode: 400,
          message: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        };
        return next(formattedError);
      }

      return next(error);
    }
  };
};

const validateQuery = (schema: z.ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedError = {
          statusCode: 400,
          message: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        };
        return next(formattedError);
      }

      return next(error);
    }
  };
};

export { validateBody, validateQuery };
