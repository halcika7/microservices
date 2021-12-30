// helpers
import { AuthRequest, Cookie, ResponseBuilder } from '@packages/common-backend';
import { HttpCode } from '@packages/errors';
// types
import { Response } from 'express';

/**
 * @export
 * @class SignOut
 */
export class SignOut {
  /**
   * @private
   * @memberof SignOut
   */
  private readonly cookie = Cookie.instance;

  /**
   * Creates an instance of SignOut.
   * @memberof SignOut
   */
  constructor() {
    this.signOut = this.signOut.bind(this);
  }

  /**
   * @param {AuthRequest} _
   * @param {Response} res
   * @return {Promise<void | Response>}
   * @memberof SignOut
   */
  async signOut(_: AuthRequest, res: Response) {
    this.cookie.removeRefreshToken(res);
    this.cookie.removeAccessToken(res);

    return new ResponseBuilder<string>(res)
      .setData('Signed out')
      .setResponseStatus(HttpCode.Ok)
      .build();
  }
}
