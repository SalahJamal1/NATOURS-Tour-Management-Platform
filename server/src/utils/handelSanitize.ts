import { Request, Response, NextFunction } from 'express';
import sanitize from 'mongo-sanitize';

export const handelSanitize = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.query) {
    for (const key in req.query) {
      req.query[key] = sanitize(req.query)[key];
    }
  }

  req.params = sanitize(req.params);
  req.body = sanitize(req.body);
  next();
};
