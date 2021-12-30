import morgan, { StreamOptions } from 'morgan';
import winston from 'winston';

const MorganLogger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        winston.format.colorize({ all: true }),
        winston.format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
  ],
});

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
  // Use the http severity
  write: message =>
    MorganLogger.http(message.substring(0, message.lastIndexOf('\n'))),
};

// Build the morgan middleware
export const morganMiddleware = morgan(
  // Define message format string (this is the default one).
  ':method :url :status :res[content-length] - :response-time ms',
  { stream }
);
