import { getSchema } from '@kernel/decoratos/Schema.js';
import * as z from 'zod/mini';

export abstract class Controller<
  TResponseBody = undefined,
  TRequestBody = Record<string, unknown>,
> {
  protected schema?: z.ZodMiniType;

  protected abstract handle(
    request: Controller.Request<TRequestBody>
  ): Promise<Controller.Response<TResponseBody>>;

  public execute(
    request: Controller.Request<TRequestBody>,
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
  export type Request<
    TBody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQueryParams = Record<string, unknown>,
  > = {
    body: TBody;
    params: TParams;
    queryParams: TQueryParams;
  };

  export type Response<TBody = undefined> = {
    statusCode: number;
    body?: TBody;
  };
}
