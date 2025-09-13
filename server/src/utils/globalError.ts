import { Request, Response, NextFunction } from 'express';
import { AppError } from './AppError';

export const globalError = (
  err: any | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};
