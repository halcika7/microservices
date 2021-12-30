import { BadRequest } from '@packages/errors';
import { Request, Response } from 'express';

import { contentType } from '../../src';

const req = {
  headers: {
    'content-type': 'application/json',
  },
} as Request;

const res = {} as Response;

const next = jest.fn();

describe('Content type testing', () => {
  it('should pass check', () => {
    contentType()(req, res, next);
    expect('').toEqual('');
  });

  it('should fail check', () => {
    let customErr;
    try {
      req.headers['content-type'] = '';
      contentType()(req, res, next);
    } catch (error) {
      customErr = error;
    }
    expect(customErr).toBeInstanceOf(BadRequest);
  });
});
