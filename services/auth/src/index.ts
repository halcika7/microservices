import { LoggerFactory } from '@packages/logger';
import { connectMongo, Server } from '@packages/common-backend';

import { env } from './types/env';
import { Routes } from './routes';

const { routes } = Routes;

const server = new Server(3000, routes);

const logger = LoggerFactory.getLogger('Auth Index', env.env ?? 'development');

// const cb =
//   env.env === 'test' || !env.env
//     ? () =>
//         connectMongo(
//           'mongodb+srv://halc:j59v4l4daA6li7dY@print-shop.la9iv.mongodb.net/auth'
//         )
//     : () => connectMongo('mongodb://auth-mongo-srv:27017/auth');

const cb = () =>
  connectMongo(
    'mongodb+srv://halc:j59v4l4daA6li7dY@print-shop.la9iv.mongodb.net/auth'
  );

try {
  server.start(cb);
  logger.info('server running', 'startttt');
} catch (error) {
  logger.error(error, 'start auth');
}

export default server;
