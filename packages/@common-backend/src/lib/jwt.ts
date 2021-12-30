import jwt from 'jsonwebtoken';
import { Unauthorized } from '@packages/errors';

import { Token } from '../types/express';

/**
 * @export
 * @class JWT
 */
export class JWT {
  /**
   * @private
   * @static
   * @type {JWT}
   * @memberof JWT
   */
  private static Instance: JWT;
  /**
   * @private
   * @type {string}
   * @memberof JWT
   */
  private readonly accessSecret: string;
  /**
   * @private
   * @type {string}
   * @memberof JWT
   */
  private readonly refreshSecret: string;
  /**
   * @private
   * @type {string}
   * @memberof JWT
   */
  private readonly accessExpiryTime: string;
  /**
   * @private
   * @type {string}
   * @memberof JWT
   */
  private readonly refreshExpiryTime: string;

  /**
   * Creates an instance of JWT.
   * @memberof JWT
   * @private
   */
  private constructor() {
    this.accessSecret = process.env.access_secret || 'secret';
    this.refreshSecret = process.env.refresh_secret || 'secret';
    this.accessExpiryTime = process.env.access_expiry_time || '15min';
    this.refreshExpiryTime = process.env.refresh_expiry_time || '7d';
  }

  /**
   * @readonly
   * @static
   * @memberof JWT
   */
  static get instance() {
    if (!this.Instance) {
      this.Instance = new JWT();
    }
    return this.Instance;
  }

  /**
   * @param {Token} payload
   * @param {boolean} [refresh=false]
   * @returns {string}
   * @memberof JWT
   */
  signToken(payload: Token, refresh = false) {
    return jwt.sign(
      payload,
      this.getSecret(refresh),
      this.getSignOptions('user', 'application token', refresh)
    );
  }

  /**
   * @param {string} token
   * @param {boolean} [refresh=false]
   * @returns {Token}
   * @throws {Unauthorized}
   * @memberof JWT
   */
  verifyToken(token: string, refresh = false) {
    try {
      return jwt.verify(
        token,
        this.getSecret(refresh),
        this.getVerifyOptions('user', 'application token')
      ) as Token;
    } catch {
      throw new Unauthorized({ message: 'Unauthorized' });
    }
  }

  /**
   * @param {string} token
   * @returns {Token}
   * @memberof JWT
   */
  decodeToken(token: string) {
    return jwt.decode(token) as Token;
  }

  /**
   * @private
   * @param {boolean} refresh
   * @returns {string}
   * @memberof JWT
   */
  private getSecret(refresh: boolean) {
    return refresh ? this.refreshSecret : this.accessSecret;
  }

  /**
   * @private
   * @param {boolean} refresh
   * @returns {string}
   * @memberof JWT
   */
  private getExpires(refresh: boolean) {
    return refresh ? this.refreshExpiryTime : this.accessExpiryTime;
  }

  /**
   * @private
   * @param {string} issuer
   * @param {string} subject
   * @param {boolean} refresh
   * @returns {jwt.SignOptions}
   * @memberof JWT
   */
  private getSignOptions(
    issuer: string,
    subject: string,
    refresh: boolean
  ): jwt.SignOptions {
    return {
      expiresIn: this.getExpires(refresh),
      algorithm: 'HS512',
      mutatePayload: false,
      issuer,
      subject,
    };
  }

  /**
   * @private
   * @param {string} issuer
   * @param {string} subject
   * @returns {jwt.VerifyOptions}
   * @memberof JWT
   */
  private getVerifyOptions(issuer: string, subject: string): jwt.VerifyOptions {
    return {
      algorithms: ['HS512'],
      issuer,
      subject,
    };
  }
}
