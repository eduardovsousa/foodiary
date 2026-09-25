import { Controller } from '@application/contracts/Controller.js';
import { ApplicationError } from '@application/errors/application/ApplicationError.js';
import { ErrorCode } from '@application/errors/ErrorCode.js';
import { HttpError } from '@application/errors/htp/HttpError.js';
import { Registry } from '@kernel/di/Registry.js';
import { lambdaBodyParser } from '@main/utils/lambdaBodyParser.js';
import { lambdaErrorResponse } from '@main/utils/lambdaErrorResponse.js';
import { Constructor } from '@shared/types/Constructor.js';
import {
  APIGatewayProxyEventV2,
  APIGatewayProxyEventV2WithJWTAuthorizer,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import * as z from 'zod/v4/core';

type Event = APIGatewayProxyEventV2 | APIGatewayProxyEventV2WithJWTAuthorizer;

export function lambdaHttpAdapter(controllerImpl: Constructor<Controller<any, unknown>>) {
  return async (event: Event): Promise<APIGatewayProxyResultV2> => {
    try {
      const controller = Registry.getInstance().resolve(controllerImpl);

      const body = lambdaBodyParser(event.body);
      const params = event.pathParameters ?? {};
      const queryParams = event.queryStringParameters ?? {};
      const accountId = (
        'authorizer' in event.requestContext
          ? event.requestContext.authorizer.jwt.claims.internalId as string
          : null
      );

      const response = await controller.execute({
        body,
        params,
        queryParams,
        accountId,
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

      if (error instanceof ApplicationError) {
        return lambdaErrorResponse({
          statusCode: error.statusCode ?? 400,
          code: error.code,
          message: error.message,
        });
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
