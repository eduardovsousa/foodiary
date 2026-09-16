import { ErrorCode } from '../ErrorCode.js';
import { ApplicationError } from './ApplicationError.js';

export class ResourceNotFound extends ApplicationError {
  public override statusCode = 404;

  public override code: ErrorCode;

  constructor(message?: string) {
    super();

    this.name = 'ResourceNotFound';
    this.message = message ?? 'The resource was not found.';
    this.code = ErrorCode.RESOURCE_NOT_FOUND;
  }
}
