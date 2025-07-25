import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { connectDB } from './config/db';
import * as env from './config/env';
import AuthRouter from './routes/auth.router';
import BrandRouter from './routes/brand.router';
import { logger } from './utils/logger';

await connectDB();

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', AuthRouter);
app.use('/api/brand', BrandRouter);

interface CustomError extends Error {
  status?: number;
}

app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
  logger.error(error);
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal Server Error',
  });
});

app.listen(env.PORT, () => {
  logger.info(`Server is running on port ${env.PORT}`);
});
