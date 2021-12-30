import { Response } from 'express';

import { ResponseBuilder } from '../../src';

const res = {
  status(num: number) {
    this.statusCode = num;
    return this;
  },
  json: jest.fn(),
  statusCode: 0,
};

test('Testing Response builder class', () => {
  new ResponseBuilder<string>(res as unknown as Response)
    .setData('message')
    .setMeta({ limit: 10 })
    .setResponseStatus(200)
    .build();

  expect(res.statusCode).toEqual(200);
});
