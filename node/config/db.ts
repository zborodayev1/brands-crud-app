import mongoose from 'mongoose';
import { logger } from '../utils/logger';
import * as env from './env';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);

    logger.DB(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    logger.error(`MongoDB connection error ${error}`);
    process.exit(1);
  }
};

mongoose.connection.on('connected', () => {
  logger.DB('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  logger.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  logger.DB('Mongoose disconnected');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  logger.DB('Mongoose connection closed through app termination');
  process.exit(0);
});
