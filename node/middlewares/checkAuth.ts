import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as env from '../config/env.js';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const JWT_SECRET = env.JWT_SECRET;

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || typeof decoded !== 'object' || !('_id' in decoded)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.userId = (decoded as { _id: string })._id;

    return next();
  } catch (err) {
    if (typeof err === 'object' && err !== null && 'name' in err) {
      if ((err as { name: string }).name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      }

      if ((err as { name: string }).name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      }
    }

    return res.status(500).json({ message: 'Internal server error' });
  }
};
