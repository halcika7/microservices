// helpers
import { BaseRepository } from '@halcika-micro/common';
// types
import { AddUser, UserDoc } from '@types';
// models
import { User } from '@model/user.model';

/**
 * @export
 * @class UserRepository
 * @extends {BaseRepository<UserDoc>}
 */
export class UserRepository extends BaseRepository<UserDoc> {
  /**
   * @private
   * @static
   * @type {UserRepository}
   * @memberof UserRepository
   */
  private static Instance: UserRepository;

  /**
   * Creates an instance of UserRepository.
   * @memberof UserRepository
   */
  private constructor() {
    super(User);
  }

  /**
   * @readonly
   * @static
   * @memberof UserRepository
   */
  static get instance() {
    if (!this.Instance) {
      this.Instance = new UserRepository();
    }
    return this.Instance;
  }

  /**
   * @param {AddUser} data
   * @return {Promise<UserDoc>}
   * @memberof UserRepository
   */
  createUser(data: AddUser) {
    return super.create<AddUser>(data).save();
  }

  /**
   * @param {string} email
   * @returns {Promise<UserDoc | null>}
   * @memberof UserRepository
   */
  findByEmail(email: string) {
    return super.model.findOne({ email }).exec();
  }
}
