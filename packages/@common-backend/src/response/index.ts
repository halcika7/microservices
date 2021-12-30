import { HttpCode } from '@packages/errors';
import { Response } from 'express';

/**
 * @interface JsonMetaResponse
 */
interface JsonMetaResponse {
  /**
   * @type {number}
   * @memberof JsonMetaResponse
   */
  limit?: number;
  /**
   * @type {number}
   * @memberof JsonMetaResponse
   */
  offset?: number;
  /**
   * @type {string}
   * @memberof JsonMetaResponse
   */
  fields?: string;
  /**
   * @type {string}
   * @memberof JsonMetaResponse
   */
  sort?: string;
  /**
   * @type {string}
   * @memberof JsonMetaResponse
   */
  search?: string;
  /**
   * @type {number}
   * @memberof JsonMetaResponse
   */
  total?: number;
}

/**
 * @interface JsonBuilder
 * @template T
 */
interface JsonBuilder<T> {
  /**
   * @param {T} data
   * @return {this}
   * @memberof JsonBuilder
   */
  setData(data: T): this;

  /**
   * @param {...JsonMetaResponse[]} metaEntry
   * @return {this}
   * @memberof JsonBuilder
   */
  setMeta(...metaEntry: JsonMetaResponse[]): this;

  /**
   * @return {Response}
   * @memberof JsonBuilder
   */
  build(): Response;

  /**
   * @param {number} status
   * @return {this}
   * @memberof JsonBuilder
   */
  setResponseStatus(status: number): this;
}

/**
 * @class JSONResponse
 * @template T
 */
class JSONResponse<T> {
  /**
   * @private
   * @type {T}
   * @memberof JSONResponse
   */
  private result?: T;

  /**
   * @private
   * @type {JsonMetaResponse}
   * @memberof JSONResponse
   */
  private meta: JsonMetaResponse;

  /**
   * Creates an instance of JSONResponse.
   * @memberof JSONResponse
   */
  constructor() {
    this.meta = {};
  }

  /**
   * @param {JsonMetaResponse} meta
   * @memberof JSONResponse
   */
  set Meta(meta: JsonMetaResponse) {
    this.meta = meta;
  }

  /**
   * @param {T|undefined} result
   * @memberof JSONResponse
   */
  set Result(result: T | undefined) {
    this.result = result;
  }

  /**
   * @readonly
   * @returns {{meta:JsonMetaResponse,result:(T|undefined)}}
   * @memberof JSONResponse
   */
  get data() {
    return { meta: this.meta, result: this.result };
  }
}

/**
 * @export
 * @class ResponseBuilder
 * @implements {JsonBuilder<T>}
 * @template T
 */
export class ResponseBuilder<T> implements JsonBuilder<T> {
  /**
   * @private
   * @type {JSONResponse<T>}
   * @memberof ResponseBuilder
   */
  private responseObject: JSONResponse<T>;

  /**
   * @private
   * @type {Response}
   * @memberof ResponseBuilder
   */
  private response!: Response;

  /**
   * Creates an instance of ResponseBuilder.
   * @param {Response} rsp
   * @memberof ResponseBuilder
   */
  constructor(rsp: Response) {
    this.responseObject = new JSONResponse<T>();
    this.response = rsp;
  }

  /**
   * @param {T} data
   * @return {this}
   * @memberof ResponseBuilder
   */
  public setData(data: T) {
    this.responseObject.Result = data;

    return this;
  }

  /**
   * @param {...JsonMetaResponse[]} metaEntry
   * @return {this}
   * @memberof ResponseBuilder
   */
  public setMeta(...metaEntry: JsonMetaResponse[]) {
    this.responseObject.Meta = Object.assign({}, ...this.clearEntry(metaEntry));

    return this;
  }

  /**
   * @param {HttpCode} status
   * @return {this}
   * @memberof ResponseBuilder
   */
  public setResponseStatus(status: HttpCode) {
    this.response.status(status);

    return this;
  }

  /**
   * @return {Response}
   * @memberof ResponseBuilder
   */
  public build() {
    return this.response.json(this.responseObject.data);
  }

  /**
   * @private
   * @param {JsonMetaResponse[]} metaData
   * @return {JsonMetaResponse}
   * @memberof ResponseBuilder
   */
  private clearEntry(metaData: JsonMetaResponse[]) {
    return metaData.map(meta => {
      const filteredMeta = Object.entries(meta).filter(
        ([, value]) => value !== undefined
      );
      return Object.fromEntries(filteredMeta);
    });
  }
}
