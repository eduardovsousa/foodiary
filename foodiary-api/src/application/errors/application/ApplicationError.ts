import { ErrorCode } from '../ErrorCode.js';

export abstract class ApplicationError extends Error {
  public statusCode?: number;

  public abstract code: ErrorCode;
}

