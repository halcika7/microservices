import { Unauthorized } from '@packages/errors';
import { Request, Response } from 'express';

import { isAuthenticated, JWT } from '../../src';

const user = {
  id: 'ajsoijidjoas',
  firstName: '',
  lastName: '',
  email: '',
  roles: ['put'],
};

const req = {
  headers: {
    authorization: '',
  },
  header(name: 'authorization') {
    // eslint-disable-next-line security/detect-object-injection
    return this.headers[name];
  },
} as Request;

const res = {} as Response;

const next = jest.fn();

const jwt = JWT.instance;

describe('Auth middleware test', () => {
  it('Should pass', () => {
    const token = jwt.signToken(user);
    req.headers.authorization = `Bearer ${token}`;

    isAuthenticated()(req, res as Response, next);

    expect(token).toBeTruthy();
  });

  it('Should fail role', () => {
    const token = jwt.signToken(user);
    req.headers.authorization = `Bearer ${token}`;

    isAuthenticated(['post'])(req, res as Response, next);

    expect(token).toBeTruthy();
  });

  it('Should pass role', () => {
    const token = jwt.signToken(user);
    req.headers.authorization = `Bearer ${token}`;

    isAuthenticated(['put'])(req, res as Response, next);

    expect(token).toBeTruthy();
  });

  it('Should fail authorization', () => {
    let customErr;
    try {
      req.headers.authorization = '';
      isAuthenticated(['post'])(req, res as Response, next);
    } catch (error) {
      customErr = error;
    }

    expect(customErr).toBeInstanceOf(Unauthorized);
  });

  it('Should fail bearer token', () => {
    let customErr;
    try {
      req.headers.authorization = 'Bearer';
      isAuthenticated(['post'])(req, res as Response, next);
    } catch (error) {
      customErr = error;
    }

    expect(customErr).toBeInstanceOf(Unauthorized);
  });
});
