import * as z from 'zod/mini';
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';

import { lambdaBodyParser } from '../utils/lambdaBodyParser.js';
import type { Controller } from '../../application/contracts/Controller.js';

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
      if (error instanceof z.core.$ZodError) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            error: {
              code: 'VALIDATION',
              message: 'Validation failed',
              issues: error.issues.map((issue) => ({
                field: issue.path.join('.'),
                message: issue.message,
              })),
            },
          }),
        };
      }

      return {
        statusCode: 500,
        body: JSON.stringify({
          error: {
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Internal server error.',
          },
        }),
      };
    }
  };
}
