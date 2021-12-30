/**
 * @export
 * @enum {number}
 */
export enum HttpCode {
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  NotModified = 304,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  RequestTooLong = 413,
  RequestUriTooLong = 414,
  UnsupportedMediaType = 415,
  ImATeapot = 418,
  UnprocessableEntity = 422,
  TooManyRequests = 429,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HttpVersionNotSupported = 505,
}

/**
 * @export
 * @enum {string}
 */
export enum HttpDescription {
  BadRequest = 'Bad Request',
  Unauthorized = 'Unauthorized',
  Forbidden = 'Forbidden',
  NotFound = 'Not Found',
  MethodNotAllowed = 'Method Not Allowed',
  NotAcceptable = 'Not Acceptable',
  RequestTimeout = 'Request Timeout',
  Conflict = 'Conflict',
  Gone = 'Gone',
  PayloadTooLarge = 'Request Entity Too Large',
  RequestUriTooLong = 'Request-URI Too Long',
  UnsupportedMediaType = 'Unsupported Media Type',
  ImATeapot = "I'm a teapot",
  UnprocessableEntity = 'Unprocessable Entity',
  TooManyRequests = 'Too Many Requests',
  InternalServerError = 'Server Error',
  NotImplemented = 'Not Implemented',
  BadGateway = 'Bad Gateway',
  ServiceUnavailable = 'Service Unavailable',
  GatewayTimeout = 'Gateway Timeout',
  HttpVersionNotSupported = 'HTTP Version Not Supported',
  CustomException = 'Custom ',
}
