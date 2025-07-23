import dotenv from 'dotenv-safe';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/brands-crud-app';

if (!MONGO_URI && NODE_ENV === 'production') {
  throw new Error('MONGO_URI environment variable is required');
}

export const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS || '12');

export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
export const COOKIE_SECRET = process.env.COOKIE_SECRET || 'secret';
