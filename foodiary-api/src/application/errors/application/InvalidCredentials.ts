import { ErrorCode } from '../ErrorCode.js';
import { ApplicationError } from './ApplicationError.js';

export class InvalidCredentials extends ApplicationError {
  public override statusCode = 401;

  public override code: ErrorCode;

  constructor() {
    super();

    this.name = 'InvalidCredentials';
    this.message = 'Invalid credentials';
    this.code = ErrorCode.INVALID_CREDENTIALS;
  }
}
