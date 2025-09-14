import { Request, Response, NextFunction } from 'express';
import { server } from '../server';
import { AppError } from './AppError';

export class GlobalError {
  // GLOBAL ERROR
  globalError(
    err: any | AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    err.statusCode = err.statusCode ?? 500;
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
  }

  notFoundError(req: Request, _res: Response, next: NextFunction) {
    next(new AppError(`We cannot found the ${req.originalUrl}`, 404));
  }

  //  ERROR UN HANDLER
  unHandlerError(type: string, err: Error) {
    console.error(`❌ ${type}!: ${err.message}`);
    server.close(() => {
      process.exit(1);
    });
  }
}
