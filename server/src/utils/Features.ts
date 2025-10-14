import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import sanitize from 'mongo-sanitize';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/users';
import { CorsOptions } from 'cors';
import { Options } from 'express-rate-limit';
dotenv.config();

const DB_URI: string =
  process.env.NODE_PUBLIC_ENVIRONMENT === 'docker'
    ? process.env.MONGO_URI!
    : process.env.DB_URI!;

export class Features {
  limitOptions: Partial<Options> = {
    max: 100,
    windowMs: 1 * 60 * 1000,
    message: 'Please try again later',
  };

  corsOptions: CorsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  };

  catchAsync(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next);
    };
  }
  // Connect DB
  async connectDBContext() {
    try {
      if (!DB_URI) {
        throw new Error('DB_URI is not defined in environment variables');
      }
      await mongoose.connect(DB_URI);
      console.log('✅ DB connected Successfully');
    } catch (err: unknown) {
      if (err instanceof Error)
        console.error('❌ DB connection failed:', err.message);
      else console.error('❌ DB connection failed:', err);
      process.exit(1);
    }
  }

  // Auth Response
  getAuthResponse(user: IUser, res: Response) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET ?? '', {
      expiresIn: '90d',
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    });

    res.json({
      status: 200,
      token,
      doc: user,
    });
  }

  handelSanitize(req: Request, _res: Response, next: NextFunction) {
    if (req.query) {
      for (const key in req.query) {
        req.query[key] = sanitize(req.query)[key];
      }
    }

    req.params = sanitize(req.params);
    req.body = sanitize(req.body);
    next();
  }
}
