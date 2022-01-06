import mongoose from 'mongoose';

import { cleanup } from '../__mocks__';

import { newTicket } from './new.spec';
import { getTicket } from './getTicket.spec';
import { getTickets } from './getTickets.spec';

describe('Testing routes', () => {
  afterAll(async () => {
    cleanup();
    await mongoose.connection.dropCollection('tickets');
    await mongoose.connection.close();
  });

  newTicket();
  getTicket();
  getTickets();
});
