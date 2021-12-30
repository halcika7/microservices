import { Router } from 'express';

import { Server } from '../../src';

test('Should start server', () => {
  const server = new Server(3000, Router());

  const rsp = server.start(jest.fn());

  expect(rsp.listening).toBeTruthy();

  rsp.close();
});
