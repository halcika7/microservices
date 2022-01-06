import { LoggerFactory } from '@halcika-micro/logger';
import { connectMongo, Server, natsWrapper } from '@halcika-micro/common';

import { env } from './types/env';
import { Routes } from './routes';
import { OrderCreatedListener } from './events/order-created.listener';
import { OrderCancelledListener } from './events/order-canceled.listener';

const logger = LoggerFactory.getLogger(
  'Tickets Index',
  env.env ?? 'development'
);

const cb =
  env.env === 'test' || !env.env
    ? () =>
        connectMongo(
          'mongodb+srv://halc:Q7BtBSWVrrvh4vry@print-shop.la9iv.mongodb.net/tickets-test'
        )
    : () =>
        connectMongo(
          'mongodb+srv://halc:Q7BtBSWVrrvh4vry@print-shop.la9iv.mongodb.net/tickets'
        );

const start = async () => {
  try {
    await natsWrapper.connect();

    await new OrderCreatedListener(natsWrapper.client).listen();
    await new OrderCancelledListener(natsWrapper.client).listen();

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    const { routes } = Routes;

    const server = new Server(3000, routes);

    server.start(cb);

    logger.info('tickets server running', 'start');
  } catch (error) {
    logger.error(error, 'start tickets');
  }
};

start();
