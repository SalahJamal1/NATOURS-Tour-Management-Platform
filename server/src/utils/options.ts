import { CorsOptions } from 'cors';
import { Options } from 'express-rate-limit';

export const limitOptions: Partial<Options> = {
  max: 100,
  windowMs: 1 * 60 * 1000,
  message: 'Please try again later',
};

export const corsOptions: CorsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};
