import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

/**
 * @export
 * @class Hash
 */
export class Hash {
  /**
   * @static
   * @param {string} value
   * @return {string}
   * @memberof Hash
   */
  static async hash(value: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(value, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  /**
   * @static
   * @param {string} hash
   * @param {string} toCompare
   * @return {boolean}
   * @memberof Hash
   */
  static async compare(hash: string, toCompare: string) {
    const [value, salt] = hash.split('.');
    const buf = (await scryptAsync(toCompare, salt, 64)) as Buffer;

    return buf.toString('hex') === value;
  }

  private constructor() {}
}
