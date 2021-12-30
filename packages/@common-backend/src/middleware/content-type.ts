import { BadRequest } from '@packages/errors';
import { NextFunction, Request, Response } from 'express';

/**
 * @param {string} [requiredType='application/json']
 */
export const contentType =
  (requiredType = 'application/json') =>
  /**
   * @param {Request} req
   * @param {Response} _
   * @param {NextFunction} next
   * @throws {BadRequest}
   * @returns {void}
   */
  (req: Request, _: Response, next: NextFunction) => {
    if (!req.headers?.['content-type']?.includes(requiredType)) {
      throw new BadRequest({ message: `Invalid content` });
    }
    return next();
  };
