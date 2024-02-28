import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const morgan = require('morgan');

const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  winstonLogger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

const morganMiddleware = morgan('tiny', {
  stream: {
    write: (message: string) => winstonLogger.info(message.trim()),
  },
});

export { winstonLogger, morganMiddleware };
