// helpers
import { ResponseBuilder } from '@halcika-micro/common';
import { HttpCode } from '@halcika-micro/errors';
// types
import { NextFunction, Request, Response } from 'express';
// services
import { SignInService } from '@service/signin.service';

/**
 * @export
 * @class SignIn
 */
export class SignIn {
  /**
   * @private
   * @memberof SignIn
   */
  private readonly signInService = SignInService.instance;

  /**
   * Creates an instance of SignIn.
   * @memberof SignIn
   */
  constructor() {
    this.signIn = this.signIn.bind(this);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {Promise<void | Response>}
   * @memberof SignIn
   */
  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.signInService.signIn(req.body, res);

      return new ResponseBuilder<string>(res)
        .setData(token)
        .setResponseStatus(HttpCode.Ok)
        .build();
    } catch (error) {
      console.log(
        '🚀 ~ file: signin.controller.ts ~ line 44 ~ SignIn ~ signIn ~ error',
        error
      );
      return next(error);
    }
  }
}
