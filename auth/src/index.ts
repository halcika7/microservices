import { LoggerFactory } from '@halcika-micro/logger';
import { connectMongo, Server } from '@halcika-micro/common';

import { env } from './types/env';
import { Routes } from './routes';

const { routes } = Routes;

const server = new Server(3000, routes);

const logger = LoggerFactory.getLogger('Auth Index', env.env ?? 'development');

const cb =
  env.env === 'test' || !env.env
    ? () =>
        connectMongo(
          'mongodb+srv://halc:Q7BtBSWVrrvh4vry@print-shop.la9iv.mongodb.net/auth-test'
        )
    : () =>
        connectMongo(
          'mongodb+srv://halc:Q7BtBSWVrrvh4vry@print-shop.la9iv.mongodb.net/auth'
        );

const fn = () => {
  let ref;

  try {
    ref = server.start(cb);
    logger.info('auth server running', 'start');
  } catch (error) {
    logger.error(error, 'start auth');
  }

  return ref;
};

export default fn();
