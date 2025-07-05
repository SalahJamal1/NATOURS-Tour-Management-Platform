import express, { NextFunction, Request, Response } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import sanitize from 'mongo-sanitize';
import limit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { AppError } from './utils/AppError';
import toursRouter from './router/toursRouter';
import reviewsRouter from './router/reviewsRouter';
import auth from './router/auth';
import bookingsRouter from './router/bookingsRouter';

const app = express();

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(hpp());
app.use(morgan('dev'));
app.use(
  limit({
    max: 100,
    windowMs: 1 * 60 * 1000,
    message: 'Please try again later',
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.query) {
    for (const key in req.query) {
      req.query[key] = sanitize(req.query)[key];
    }
  }

  req.params = sanitize(req.params);
  req.body = sanitize(req.body);
  next();
});

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/reviews', reviewsRouter);
app.use('/api/v1/auth', auth);
app.use('/api/v1/bookings', bookingsRouter);

app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`We cannot found the ${req.originalUrl}`, 404));
});

app.use(
  (err: any | AppError, req: Request, res: Response, next: NextFunction) => {
    console.log(err.name, err.code);
    let message: string = err.message;
    if (err.name === 'MongoServerError' && err.code === 11000) {
      const duplicatedField = Object.keys(err.keyValue)[0];
      message = `The ${duplicatedField} is already in use. Please use another one.`;
    } else if (err.name === 'ValidationError') {
      message = Object.values(err.errors)
        .map((el: any) => el.message)
        .join('');
    }

    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
      status: err.status,
      message: message,
      stack: err.stack,
    });
  }
);

export default app;
