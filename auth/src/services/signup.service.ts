// helpers
import { BadRequest } from '@halcika-micro/errors';
// repositories
import { UserRepository } from '@repository/user.repository';
// types
import { AddUser } from '@types';

/**
 * @export
 * @class SignupService
 */
export class SignupService {
  /**
   * @private
   * @static
   * @type {SignupService}
   * @memberof SignupService
   */
  private static Instance: SignupService;
  /**
   * @private
   * @type {UserRepository}
   * @memberof SignupService
   */
  private readonly userRepository = UserRepository.instance;

  /**
   * Creates an instance of SignupService.
   * @memberof SignupService
   */
  private constructor() {}

  /**
   * @readonly
   * @static
   * @type {SignupService}
   * @memberof SignupService
   */
  static get instance() {
    if (!this.Instance) {
      this.Instance = new SignupService();
    }
    return this.Instance;
  }

  /**
   * @param {AddUser} data
   * @return {Promise<UserDoc>}
   * @memberof SignupService
   */
  async signup(data: AddUser) {
    const exists = await this.userRepository.findByEmail(data.email);

    if (exists) {
      throw new BadRequest({ message: 'User exists' });
    }

    return this.userRepository.createUser(data);
  }
}
