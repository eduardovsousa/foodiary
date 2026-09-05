
import { Schema } from '../../kernel/decoratos/Schema.js';
import { Controller } from '../contracts/Controller.js';
import { helloSchema, type HelloBody } from './schemas/helloSchema.js';

@Schema(helloSchema)
export class HelloController extends Controller<unknown> {
  protected override schema = helloSchema;

  protected override async handle(
    request: Controller.Request<HelloBody>,
  ): Promise<Controller.Response<unknown>> {

    return {
      statusCode: 200,
      body: {
        parsedBody: request.body,
      },
    };
  }
}
