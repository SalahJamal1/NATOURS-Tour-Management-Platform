import type { NextFunction, Request, Response } from 'express';
import { Users } from '../models/users';
import { catchAsync } from '../utils/catchAsync';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError';
import { getAuthResponse } from '../utils/getAuthResponse';

export const jwt_expiry = process.env.JWTE || '';

// SIGN UP
export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, passwordConfirm } = req.body;
    if (password !== passwordConfirm) {
      return next(new AppError("The Password does't match", 500));
    }
    const existEmail = await Users.findOne({ email: email });
    if (existEmail) {
      return next(
        new AppError(
          'The Email is already in use. Please use another one.',
          500
        )
      );
    }
    const user = await Users.create(req.body);
    user.password = undefined;

    getAuthResponse(user, res);
  }
);

// LOGIN
export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return next(new AppError("The user doesn't exist", 404));
    }
    if (!(await user.authProvider(password, user.password))) {
      return next(new AppError('The password is wrong', 404));
    }
    user.password = undefined;

    getAuthResponse(user, res);
  }
);

// LOGOUT
export const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: new Date(0),
    });

    res.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    );
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');

    res.json({
      status: 200,
      message: 'You are logged out',
    });
  }
);

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string = '';
    const auth = req.headers.authorization;
    if (auth && auth.startsWith('Bearer')) {
      token = auth.substring(7);
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return next(new AppError('Unauthorized: No token provided', 401));
    }

    const decoded = jwt.verify(token, jwt_expiry) as jwt.JwtPayload;
    const user = await Users.findById(decoded.id);
    if (!user) {
      return next(new AppError('User no longer exists', 401));
    }
    (req as any).user = user;
    next();
  }
);

// ME
export const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await Users.findById((req as any).user._id);
    user.password = undefined;
    res.json({
      status: 200,
      user,
    });
  }
);
