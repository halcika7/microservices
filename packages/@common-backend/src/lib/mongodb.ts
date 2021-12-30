import { LoggerFactory } from '@packages/logger';
import { connect, Model } from 'mongoose';

const logger = LoggerFactory.getLogger('MongoDB Connection', 'development');

/**
 * @param {string} uri
 * @returns {Promise<void>}
 */
export const connectMongo = async (uri: string) => {
  try {
    await connect(uri);
  } catch (error) {
    logger.error(error, 'connectMongo');
  }
};

/**
 * @export
 * @class BaseRepository
 * @template T
 */
export class BaseRepository<T> {
  /**
   * Creates an instance of BaseRepository.
   * @param {Model<T>} Model
   * @memberof BaseRepository
   */
  constructor(private readonly Model: Model<T>) {}

  /**
   * @protected
   * @template TV
   * @param {TV} values
   * @returns {T}
   * @memberof BaseRepository
   */
  protected create<TV>(values: TV): T {
    return new this.Model({ ...values });
  }

  /**
   * @protected
   * @param {string} id
   * @memberof BaseRepository
   */
  protected byId(id: string) {
    return this.Model.findById(id);
  }

  /**
   * @readonly
   * @protected
   * @returns {Model<T, {}, {}, {}>}
   * @memberof BaseRepository
   */
  protected get model() {
    return this.Model;
  }
}
