import { LoggerFactory } from '@halcika-micro/logger';
import { connectMongo, natsWrapper, Server } from '@halcika-micro/common';

import { env } from './types/env';
import { Routes } from './routes';
import { TicketCreatedListener } from './events/ticket-created.listener';
import { TicketUpdatedListener } from './events/ticket-updated.listener';

const logger = LoggerFactory.getLogger(
  'Orders Index',
  env.env ?? 'development'
);

const cb =
  env.env === 'test' || !env.env
    ? () =>
        connectMongo(
          'mongodb+srv://halc:Q7BtBSWVrrvh4vry@print-shop.la9iv.mongodb.net/orders-test'
        )
    : () =>
        connectMongo(
          'mongodb+srv://halc:Q7BtBSWVrrvh4vry@print-shop.la9iv.mongodb.net/orders'
        );

const start = async () => {
  try {
    await natsWrapper.connect();

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    await new TicketCreatedListener(natsWrapper.client).listen();
    await new TicketUpdatedListener(natsWrapper.client).listen();

    const { routes } = Routes;

    const server = new Server(3000, routes);

    server.start(cb);

    logger.info('orders server running', 'start');
  } catch (error) {
    logger.error(error, 'start orders');
  }
};

start();
