import { BadRequest } from '@packages/errors';
import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

/**
 * @export
 * @interface NonEmptyArray
 * @extends {Array<T>}
 * @template T
 */
export interface NonEmptyArray<T> extends Array<T> {
  /**
   * @type {T}
   * @memberof NonEmptyArray
   */
  0: T;
}

/**
 * @param {NonEmptyArray<ValidationChain>} validations
 */
export const validateWithThrow = (
  validations: NonEmptyArray<ValidationChain>
) => {
  /**
   * @param {Request} req
   * @param {Response} _
   * @param {NextFunction} next
   * @return {Promise<void>}
   */
  return async (req: Request, _: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validate(req);

    if (!Object.keys(errors).length) {
      return next();
    }

    const error = new BadRequest({ errors });

    return next(error);
  };
};

/**
 * @param {Request} req
 * @return {Record<string, string>}
 */
export const validate = (req: Request) => {
  const errors = validationResult(req);

  const reducedErrors = errors.array().reduce((res, current) => {
    res.set(current.param, current.msg);
    return res;
  }, new Map<string, string>());

  return Object.fromEntries(reducedErrors);
};
