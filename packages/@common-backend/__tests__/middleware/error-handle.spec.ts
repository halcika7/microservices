import { BadRequest } from '@packages/errors';
import { Request, Response } from 'express';

import { errorHandle } from '../../src';

const req = {
  headers: {
    'content-type': 'application/json',
  },
} as Request;

const res = {
  status(num: number) {
    this.statusCode = num;
    return this;
  },
  json: jest.fn(),
  statusCode: 0,
};

describe('Error handle middleware testing', () => {
  it('should return instanceof HttpException', () => {
    const error = new BadRequest();
    errorHandle(error, req, res as unknown as Response);
    expect(res.statusCode).toEqual(400);
  });

  it('should return instanceof SyntaxError in body', () => {
    const error = new SyntaxError('body') as unknown as Record<string, unknown>;
    error.body = true;
    errorHandle(
      error as unknown as SyntaxError,
      req,
      res as unknown as Response
    );
    expect(res.statusCode).toEqual(400);
  });

  it('should return instanceof InternalServerError', () => {
    const error = new Error('message');
    errorHandle(error, req, res as unknown as Response);
    expect(res.statusCode).toEqual(500);
  });
});
