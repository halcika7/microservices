// types
import { Response, NextFunction } from 'express';
// errors
import { BadRequest, Unauthorized } from '@packages/errors';

import { AuthRequest } from '../types';
import { JWT, Cookie } from '../lib';

const cookie = Cookie.instance;

/**
 * @param {(string[] | null)} [roles]
 */
export const isAuthenticated =
  (roles: string[] | null = null) =>
  /**
   * @param {AuthRequest} req
   * @param {Response} _
   * @param {NextFunction} next
   * @returns {void}
   */
  (req: AuthRequest, _: Response, next: NextFunction) => {
    const token = cookie.getAccessToken(req);

    if (!token) throw new Unauthorized({ message: 'Unauthorized request' });

    try {
      const verified = JWT.instance.verifyToken(token);

      if (roles) {
        const validRole = roles.some(role => verified.roles.includes(role));

        if (!validRole) {
          throw new BadRequest({ message: 'Invalid role' });
        }
      }

      req.user = {
        id: verified.id,
        firstName: verified.firstName,
        lastName: verified.lastName,
        email: verified.email,
        roles: verified.roles,
      };

      return next();
    } catch (err) {
      return next(err);
    }
  };
