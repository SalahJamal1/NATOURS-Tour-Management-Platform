import { Request, Response, NextFunction } from 'express';
import { Booking } from '../models/booking';
import { IToure, Tours } from '../models/tours';
import { AppError } from '../utils/AppError';
import { Features } from '../utils/Features';

const { catchAsync } = new Features();

export const createBooking = catchAsync(
  async (req: Request | any, res: Response, next: NextFunction) => {
    console.log(req.params);
    const tour: IToure | null = await Tours.findById(req.params.tourId);

    if (!tour) {
      return next(new AppError('Tour not found.', 404));
    }
    const doc = await Booking.create({
      tour: tour._id,
      user: req.user._id,
      price: tour.price,
    });
    res.json({
      status: 200,
      doc,
    });
  }
);
