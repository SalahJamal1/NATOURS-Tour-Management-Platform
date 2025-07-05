import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import type { Model, Document } from 'mongoose';
import { AppError } from '../utils/AppError';

export const getDocs = <T extends Document>(model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const docs = await model.find();
    res.json({
      status: 200,
      docs,
    });
  });

export const getDoc = <T extends Document>(model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await model.findById(req.params.id);

    if (!doc) {
      throw new AppError(`We cannot found the doc #${req.params.id}`, 404);
    }

    res.json({
      status: 200,
      doc,
    });
  });
