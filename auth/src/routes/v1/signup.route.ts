import { Router } from 'express';
import { body } from 'express-validator';
import { validateWithThrow } from '@halcika-micro/common';
import { Signup } from '@controller/signup.controller';

/**
 * @export
 * @class SignUpRoute
 */
export class SignUpRoute {
  /**
   * @private
   * @type {Router}
   * @memberof SignUpRoute
   */
  private readonly router = Router();
  /**
   * @private
   * @type {Signup}
   * @memberof SignUpRoute
   */
  private readonly signup: Signup;

  /**
   * Creates an instance of SignUpRoute.
   * @memberof SignUpRoute
   */
  constructor() {
    this.signup = new Signup();
  }

  /**
   * @readonly
   * @type {Router}
   * @memberof SignUpRoute
   */
  get routes() {
    this.router.post(
      '/sign-up',
      validateWithThrow([
        body('email')
          .isEmail()
          .normalizeEmail()
          .withMessage('Email must be valid'),
        body('password').trim().isLength({ min: 8, max: 32 }).isStrongPassword({
          minLowercase: 1,
          minSymbols: 1,
          minNumbers: 1,
          minUppercase: 1,
        }),
      ]),
      this.signup.signup
    );

    return this.router;
  }
}
