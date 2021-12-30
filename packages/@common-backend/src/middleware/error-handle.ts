import { NextFunction, Request, Response } from 'express';
import { HttpException, InternalServerError, HttpCode } from '@packages/errors';

/**
 * @param {(Error | HttpException)} error
 * @param {Request} _
 * @param {Response} res
 * @returns {Response}
 */
export const errorHandle = (
  error: Error | HttpException,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (error instanceof HttpException) {
    const { status, ...rest } = error.getResponse();
    return res.status(status).json({ ...rest });
  }

  if (error instanceof SyntaxError && 'body' in error) {
    return res
      .status(HttpCode.BadRequest)
      .json({ message: 'Malformed request body' });
  }

  const serverError = new InternalServerError();
  const { status, ...rest } = serverError.getResponse();

  return res.status(status).json({ ...rest });
};
