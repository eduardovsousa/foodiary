import type { IController } from '../contracts/Controller.js';

export class HelloController implements IController<unknown> {
  async handle(request: IController.Request): Promise<IController.Response<unknown>> {
    return {
      statusCode: 200,
      body: {
        deuBom: true,
        request,
      },
    };
  }
}
