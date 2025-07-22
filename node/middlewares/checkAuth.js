import jwt from 'jsonwebtoken';
import * as env from '../config/env.js';

const JWT_SECRET = env.JWT_SECRET;

export const checkAuth = (req, res, next) => {
  const token = req.cookies.accessToken;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.userId;

    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }

    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    return res.status(500).json({ message: 'Internal server error' });
  }
};
