import { Request, Response, NextFunction } from 'express';
import type { Model, Document } from 'mongoose';
import { AppError } from '../utils/AppError';
import { Features } from '../utils/Features';

const { catchAsync } = new Features();

export const getDocs = <T extends Document>(model: Model<T>) =>
  catchAsync(async (_req: Request, res: Response, next: NextFunction) => {
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
