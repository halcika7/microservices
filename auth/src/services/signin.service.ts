// helpers
import { Hash } from '@lib/hash';
import { Cookie, JWT, Token } from '@halcika-micro/common';
import { BadRequest } from '@halcika-micro/errors';
// repositories
import { UserRepository } from '@repository/user.repository';
// types
import { AddUser } from '@types';
import { Response } from 'express';

/**
 * @export
 * @class SignInService
 */
export class SignInService {
  /**
   * @private
   * @static
   * @type {SignInService}
   * @memberof SignInService
   */
  private static Instance: SignInService;
  /**
   * @private
   * @type {UserRepository}
   * @memberof SignInService
   */
  private readonly userRepository = UserRepository.instance;
  /**
   * @private
   * @type {JWT}
   * @memberof SignInService
   */
  private readonly jwt = JWT.instance;
  /**
   * @private
   * @type {Cookie}
   * @memberof SignInService
   */
  private readonly cookie = Cookie.instance;

  /**
   * Creates an instance of SignInService.
   * @memberof SignInService
   */
  private constructor() {}

  /**
   * @readonly
   * @static
   * @type {SignInService}
   * @memberof SignInService
   */
  static get instance() {
    if (!this.Instance) {
      this.Instance = new SignInService();
    }
    return this.Instance;
  }

  /**
   * @param {AddUser} data
   * @param {Response} res
   * @return {Promise<string>}
   * @memberof SignInService
   */
  async signIn(data: AddUser, res: Response) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new BadRequest({ message: 'Invalid credentials' });
    }

    const isPasswordCorrect = await Hash.compare(user.password, data.password);

    if (!isPasswordCorrect) {
      throw new BadRequest({ message: 'Invalid credentials' });
    }

    const obj = {
      ...user.toJSON(),
      firstName: '',
      lastName: '',
      roles: [],
    } as Token;

    this.cookie.setRefreshToken(res, this.jwt.signToken(obj, true));
    this.cookie.setAccessToken(res, this.jwt.signToken(obj));

    return 'OK';
  }
}
