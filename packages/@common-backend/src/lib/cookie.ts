import { Response, CookieOptions, Request } from 'express';

/**
 * @export
 * @class Cookie
 */
export class Cookie {
  /**
   * @private
   * @static
   * @type {Cookie}
   * @memberof Cookie
   */
  private static Instance: Cookie;
  /**
   * @private
   * @type {string}
   * @memberof Cookie
   */
  private readonly _refreshName: string;
  /**
   * @private
   * @type {string}
   * @memberof Cookie
   */
  private readonly _accessName: string;
  /**
   * @private
   * @type {CookieOptions}
   * @memberof Cookie
   */
  private readonly refreshOptions: CookieOptions;
  /**
   * @private
   * @type {CookieOptions}
   * @memberof Cookie
   */
  private readonly accessOptions: CookieOptions;

  /**
   * @readonly
   * @static
   * @memberof Cookie
   */
  static get instance() {
    if (!this.Instance) {
      this.Instance = new Cookie();
    }
    return this.Instance;
  }

  /**
   * Creates an instance of Cookie.
   * @memberof Cookie
   * @private
   */
  private constructor() {
    this._refreshName = process.env.cookie_refresh_name || 'refresh';
    this._accessName = process.env.cookie_access_name || 'access';
    this.refreshOptions = {
      httpOnly: true,
      path: process.env.cookie_path || '/api/users/v1/refresh',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    };
    this.accessOptions = {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    };
  }

  /**
   * @param {Response} res
   * @param {string} token
   * @memberof Cookie
   * @returns {void}
   */
  setRefreshToken(res: Response, token: string) {
    res.cookie(this._refreshName, token, this.refreshOptions);
  }

  /**
   * @param {Response} res
   * @param {string} token
   * @memberof Cookie
   * @returns {void}
   */
  setAccessToken(res: Response, token: string) {
    res.cookie(this._accessName, token, this.accessOptions);
  }

  /**
   * @param {Response} res
   * @memberof Cookie
   * @returns {void}
   */
  removeRefreshToken(res: Response) {
    res.cookie(this._refreshName, '', this.refreshOptions);
    res.clearCookie(this._refreshName, this.refreshOptions);
  }

  /**
   * @param {Response} res
   * @memberof Cookie
   * @returns {void}
   */
  removeAccessToken(res: Response) {
    res.cookie(this._accessName, '', this.accessOptions);
    res.clearCookie(this._accessName, this.accessOptions);
  }

  /**
   * @param {Request} req
   * @returns {string}
   * @memberof Cookie
   */
  getRefreshToken(req: Request) {
    return req.cookies[this._refreshName] as string;
  }

  /**
   * @param {Request} req
   * @returns {string}
   * @memberof Cookie
   */
  getAccessToken(req: Request) {
    return req.cookies[this._accessName] as string;
  }
}
