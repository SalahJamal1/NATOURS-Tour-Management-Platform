import { Request, Response, NextFunction } from 'express';
import { AppError } from './AppError';

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new AppError(`We cannot found the ${req.originalUrl}`, 404));
};
