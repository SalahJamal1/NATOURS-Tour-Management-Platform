import type { Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/users';
import { jwt_expiry } from '../controller/auth';

export const getAuthResponse = (user: IUser, res: Response) => {
  const token = jwt.sign({ id: user._id }, jwt_expiry, {
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
};
