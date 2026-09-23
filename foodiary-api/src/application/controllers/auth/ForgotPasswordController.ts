import { Controller } from '@application/contracts/Controller.js';
import { BadRequest } from '@application/errors/htp/BadRequest.js';
import { ForgotPasswordUseCase } from '@application/useCases/auth/ForgotPasswordUseCase.js';
import { Injectable } from '@kernel/decorators/Injectable.js';
import { Schema } from '@kernel/decorators/Schema.js';
import { ForgotPasswordBody, forgotPasswordSchema } from './schemas/forgotPasswordSchema.js';

@Injectable(ForgotPasswordUseCase)
@Schema(forgotPasswordSchema)
export class ForgotPasswordController extends Controller<
  'public', ForgotPasswordController.Response,
  ForgotPasswordBody
> {
  constructor(private readonly forgotPasswordUseCase: ForgotPasswordUseCase) {
    super();
  }

  protected override async handle(
    { body }: Controller.Request<'public', ForgotPasswordBody>,
  ): Promise<Controller.Response<ForgotPasswordController.Response>> {
    try {
      const { email } = body;

      await this.forgotPasswordUseCase.execute({ email });
    } catch (error) {
      throw new BadRequest(error);
    }

    return {
      statusCode: 204,
    };
  }
}

export namespace ForgotPasswordController {
  export type Response = {
    accessToken: string;
    refreshToken: string;
  }
}
