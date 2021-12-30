// helpers
import { Cookie, JWT } from '@packages/common-backend';
// types
import { Request, Response } from 'express';

/**
 * @export
 * @class RefreshService
 */
export class RefreshService {
  /**
   * @private
   * @static
   * @type {RefreshService}
   * @memberof RefreshService
   */
  private static Instance: RefreshService;
  /**
   * @private
   * @type {JWT}
   * @memberof RefreshService
   */
  private readonly jwt = JWT.instance;
  /**
   * @private
   * @type {Cookie}
   * @memberof RefreshService
   */
  private readonly cookie = Cookie.instance;

  /**
   * Creates an instance of RefreshService.
   * @memberof RefreshService
   */
  private constructor() {}

  /**
   * @readonly
   * @static
   * @returns {RefreshService}
   * @memberof RefreshService
   */
  static get instance() {
    if (!this.Instance) {
      this.Instance = new RefreshService();
    }
    return this.Instance;
  }

  /**
   * @param {Response} res
   * @param {Request} req
   * @return {Promise<string>}
   * @memberof RefreshService
   */
  refresh(res: Response, req: Request) {
    const token = this.cookie.getRefreshToken(req);

    const verified = this.jwt.verifyToken(token, true);

    const data = {
      id: verified.id,
      firstName: verified.firstName,
      lastName: verified.lastName,
      roles: verified.roles,
      email: verified.email,
    };

    const accessToken = this.jwt.signToken(data);

    this.cookie.setRefreshToken(res, this.jwt.signToken(data, true));
    this.cookie.setAccessToken(res, accessToken);

    return accessToken;
  }
}
