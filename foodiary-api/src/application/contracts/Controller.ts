import * as z from 'zod/mini';
import { getSchema } from '../../kernel/decoratos/Schema.js';

export abstract class Controller<TBody = undefined> {
  protected schema?: z.ZodMiniType;

  protected abstract handle(
    params: Controller.Request<TBody>
  ): Promise<Controller.Response<TBody>>;

  public execute(
    request: Controller.Request<TBody>,
  ): Promise<Controller.Response<TBody>> {
    const body = this.validateBody(request.body);

    return this.handle({
      ...request,
      body,
    });
  }

  private validateBody(body: TBody): TBody {
    const schema = getSchema(this);

    if (!schema) {
      return body;
    }

    return schema.parse(body) as TBody;
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
