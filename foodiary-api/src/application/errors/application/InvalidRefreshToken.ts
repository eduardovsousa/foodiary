import { ErrorCode } from '../ErrorCode.js';
import { ApplicationError } from './ApplicationError.js';

export class InvalidRefreshToken extends ApplicationError {
  public override statusCode = 401;

  public override code: ErrorCode;

  constructor() {
    super();

    this.name = 'InvalidRefreshToken';
    this.message = 'Invalid Refresh Token';
    this.code = ErrorCode.INVALID_REFRESH_TOKEN;
  }
}
