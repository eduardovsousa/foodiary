import { ErrorCode } from '../ErrorCode.js';
import { HttpError } from './HttpError.js';

export class Unauthorized extends HttpError {
  public override statusCode = 401;

  public override code: ErrorCode;

  constructor(message?: any, code?: ErrorCode) {
    super();

    this.name = 'Unauthorized';
    this.message = message ?? 'Unauthorized';
    this.code = code ?? ErrorCode.UNAUTHORIZED;
  }
}
