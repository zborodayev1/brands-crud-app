import fs from 'fs';
import path from 'path';
import winston, { LeveledLogMethod, Logger } from 'winston';

interface CustomLogger extends Logger {
  DB: LeveledLogMethod;
  worker: LeveledLogMethod;
  success: LeveledLogMethod;
  fail: LeveledLogMethod;
  code_error: LeveledLogMethod;
}

const customLevels = {
  levels: {
    DB: 0,
    worker: 1,
    info: 2,
    success: 3,
    warn: 4,
    fail: 5,
    code_error: 6,
    error: 7,
  },
  colors: {
    DB: 'cyan',
    worker: 'magenta',
    success: 'green',
    fail: 'yellow',
    code_error: 'red',
    info: 'blue',
    warn: 'yellow',
    error: 'red',
  },
};

const logDir = path.resolve('logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const levelFilter = (allowedLevels: string | string[]) =>
  winston.format((info) => {
    return allowedLevels.includes(info.level) ? info : false;
  });

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `[${timestamp}] ${level}: ${stack || message}`;
});

winston.addColors(customLevels.colors);

export const logger = winston.createLogger({
  levels: customLevels.levels,
  level: 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), logFormat),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), logFormat),
    }),

    new winston.transports.File({
      filename: path.join(logDir, 'app.log'),
      level: 'success',
    }),

    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      format: combine(
        levelFilter(['warn', 'fail', 'code_error', 'error'])(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        logFormat,
      ),
    }),
  ],
}) as CustomLogger;
