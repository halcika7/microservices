import { Request, Response } from 'express';
import { body } from 'express-validator';

import { validateWithThrow } from '../../src';

const req = { body: { name: 'name' } } as Request;

describe('validateWithThrow middleware', () => {
  it('should pass', () => {
    validateWithThrow([body('name').trim().notEmpty()])(
      req,
      {} as unknown as Response,
      jest.fn()
    );
    expect(req.body.name).toEqual('name');
  });

  it('should fail', async () => {
    req.body.name = '';
    await validateWithThrow([body('name').trim().notEmpty()])(
      req,
      {} as unknown as Response,
      jest.fn()
    );
    expect(req.body.name).toEqual('');
  });
});
