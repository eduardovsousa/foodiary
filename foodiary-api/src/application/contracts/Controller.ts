import { getSchema } from '@kernel/decorators/Schema.js';
import * as z from 'zod/mini';

type TRouteType = 'public' | 'private';

export abstract class Controller<
  TType extends TRouteType,
  TResponseBody = undefined,
  TRequestBody = Record<string, unknown>,
> {
  protected schema?: z.ZodMiniType;

  protected abstract handle(
    request: Controller.Request<TType, TRequestBody>
  ): Promise<Controller.Response<TResponseBody>>;

  public execute(
    request: Controller.Request<TType, TRequestBody>,
  ): Promise<Controller.Response<TResponseBody>> {
    const body = this.validateBody(request.body);

    return this.handle({
      ...request,
      body,
    });
  }

  private validateBody(body: TRequestBody): TRequestBody {
    const schema = getSchema(this);

    if (!schema) {
      return body;
    }

    return schema.parse(body) as TRequestBody;
  }
}

export namespace Controller {
  type BaseRequest<
    TBody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQueryParams = Record<string, unknown>,
  > = {
    body: TBody;
    params: TParams;
    queryParams: TQueryParams;
  };

  type PublicRequest<
    TBody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQueryParams = Record<string, unknown>,
  > = BaseRequest<TBody, TParams, TQueryParams> & {
    accountId: null;
  }

  type PrivateRequest<
    TBody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQueryParams = Record<string, unknown>,
  > = BaseRequest<TBody, TParams, TQueryParams> & {
    accountId: string;
  }

  export type Request<
    TType extends TRouteType,
    TBody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQueryParams = Record<string, unknown>,
  > = TType extends 'public'
    ? PublicRequest<TBody, TParams, TQueryParams>
    : PrivateRequest<TBody, TParams, TQueryParams>

  export type Response<TBody = undefined> = {
    statusCode: number;
    body?: TBody;
  };
}
