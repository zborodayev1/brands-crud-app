import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { connectDB } from './config/db.js';
import * as env from './config/env.js';
import AuthRouter from './routes/router.js';

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

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
