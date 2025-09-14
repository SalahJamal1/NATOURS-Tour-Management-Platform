import express, { NextFunction, Request, Response } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import limit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import toursRouter from './router/toursRouter';
import reviewsRouter from './router/reviewsRouter';
import auth from './router/auth';
import bookingsRouter from './router/bookingsRouter';
import { GlobalError } from './utils/HandelGlobalError';
import { Features } from './utils/Features';

const app = express();
const { corsOptions, limitOptions, handelSanitize } = new Features();
const { globalError, notFoundError } = new GlobalError();

app.use(hpp());
app.use(helmet());

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));
app.use(limit(limitOptions));
app.use(cors(corsOptions));
app.use(handelSanitize);

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/reviews', reviewsRouter);
app.use('/api/v1/auth', auth);
app.use('/api/v1/bookings', bookingsRouter);

app.all(/.*/, notFoundError);

app.use(globalError);

export default app;
