import type { ErrorCode } from '@application/errors/ErrorCode.js';

interface ILambdaErrorResponseParams {
  statusCode: number;
  code: ErrorCode;
  message: any;
}

export function lambdaErrorResponse({
  code,
  message,
  statusCode,
}: ILambdaErrorResponseParams) {
  return {
    statusCode,
    body: JSON.stringify({
      error: {
        code,
        message,
      },
    }),
  };
}
