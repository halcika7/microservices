import { Request, Response } from 'express';

import { Cookie } from '../../src';

const res = {
  cookie: jest.fn(),
} as unknown as Response;

const req = {
  cookies: {
    cookieRefreshName: 'token',
  },
} as unknown as Request;

test('Test Cookie class', () => {
  const cookie = Cookie.instance;
  const cookie2 = Cookie.instance;

  expect(cookie2).toBeInstanceOf(Cookie);

  cookie.setRefreshToken(res, 'token');
  const token = cookie.getRefreshToken(req);
  cookie.removeRefreshToken(res);
  expect(token).toStrictEqual('token');
});
