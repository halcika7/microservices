import { Router } from 'express';
import { body } from 'express-validator';
import { validateWithThrow } from '@halcika-micro/common';
import { SignIn } from '@controller/signin.controller';

/**
 * @export
 * @class SignInRoute
 */
export class SignInRoute {
  /**
   * @private
   * @type {Router}
   * @memberof SignInRoute
   */
  private readonly router = Router();
  /**
   * @private
   * @type {SignIn}
   * @memberof SignInRoute
   */
  private readonly signIn: SignIn;

  /**
   * Creates an instance of SignInRoute.
   * @memberof SignInRoute
   */
  constructor() {
    this.signIn = new SignIn();
  }

  /**
   * @readonly
   * @type {Router}
   * @memberof SignInRoute
   */
  get routes() {
    this.router.post(
      '/sign-in',
      validateWithThrow([
        body('email')
          .isEmail()
          .normalizeEmail()
          .withMessage('Email must be valid'),
        body('password')
          .trim()
          .notEmpty()
          .withMessage('You must supply a password'),
      ]),
      this.signIn.signIn
    );

    return this.router;
  }
}
