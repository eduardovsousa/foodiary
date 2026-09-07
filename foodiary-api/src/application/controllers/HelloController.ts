import { Controller } from '@application/contracts/Controller.js';
import type { HelloUseCase } from '@application/useCases/HelloUseCase.js';
import { Schema } from '@kernel/decoratos/Schema.js';
import { helloSchema, type HelloBody } from './schemas/helloSchema.js';

@Schema(helloSchema)
export class HelloController extends Controller<unknown> {
  constructor(private readonly helloUseCase: HelloUseCase) {
    super();
  }

  protected override schema = helloSchema;

  protected override async handle(
    request: Controller.Request<HelloBody>,
  ): Promise<Controller.Response<unknown>> {

    const result = await this.helloUseCase.execute({
      email: request.body.email,
    });

    return {
      statusCode: 200,
      body: {
        result,
      },
    };
  }
}
