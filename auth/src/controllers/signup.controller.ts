// helpers
import { ResponseBuilder } from '@halcika-micro/common';
import { HttpCode } from '@halcika-micro/errors';
// types
import { NextFunction, Request, Response } from 'express';
import { UserDoc } from '@types';
// services
import { SignupService } from '@service/signup.service';

/**
 * @export
 * @class Signup
 */
export class Signup {
  /**
   * @private
   * @memberof Signup
   */
  private readonly signupService = SignupService.instance;

  /**
   * Creates an instance of Signup.
   * @memberof Signup
   */
  constructor() {
    this.signup = this.signup.bind(this);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {Promise<void | Response>}
   * @memberof Signup
   */
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.signupService.signup(req.body);

      return new ResponseBuilder<UserDoc>(res)
        .setData(user)
        .setResponseStatus(HttpCode.Created)
        .build();
    } catch (error) {
      return next(error);
    }
  }
}
