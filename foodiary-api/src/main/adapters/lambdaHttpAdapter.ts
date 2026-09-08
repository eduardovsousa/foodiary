import { Controller } from '@application/contracts/Controller.js';
import { ErrorCode } from '@application/errors/ErrorCode.js';
import { HttpError } from '@application/errors/htp/HttpError.js';
import { lambdaBodyParser } from '@main/utils/lambdaBodyParser.js';
import { lambdaErrorResponse } from '@main/utils/lambdaErrorResponse.js';
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import * as z from 'zod/v4/core';

export function lambdaHttpAdapter(
  controller: Controller<unknown>,
) {
  return async (
    event: APIGatewayProxyEventV2,
  ): Promise<APIGatewayProxyResultV2> => {
    try {
      const body = lambdaBodyParser(event.body);
      const params = event.pathParameters ?? {};
      const queryParams = event.queryStringParameters ?? {};

      const response = await controller.execute({
        body,
        params,
        queryParams,
      });

      return {
        statusCode: response.statusCode,
        body:
          response.body !== undefined
            ? JSON.stringify(response.body)
            : undefined,
      };
    } catch (error) {
      if (error instanceof z.$ZodError) {
        return lambdaErrorResponse({
          statusCode: 400,
          code: ErrorCode.VALIDATION,
          message: error.issues.map(issue => ({
            field: issue.path.join('.'),
            error: issue.message,
          })),
        });
      }

      if (error instanceof HttpError) {
        return lambdaErrorResponse(error);
      }

      // eslint-disable-next-line no-console
      console.log(error);

      return lambdaErrorResponse({
        statusCode: 500,
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      });
    }
  };
}
