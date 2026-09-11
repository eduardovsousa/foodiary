import { Controller } from '@application/contracts/Controller.js';
import { BadRequest } from '@application/errors/htp/BadRequest.js';
import { ConfirmForgotPasswordUseCase } from '@application/useCases/auth/ConfirmForgotPasswordUseCase.js';
import { Injectable } from '@kernel/decoratos/Injectable.js';
import { Schema } from '@kernel/decoratos/Schema.js';
import { ConfirmForgotPasswordBody, confirmForgotPasswordSchema } from './schemas/confirmForgotPasswordSchema.js';

@Injectable(ConfirmForgotPasswordUseCase)
@Schema(confirmForgotPasswordSchema)
export class ConfirmForgotPasswordController extends Controller<
  'public', ConfirmForgotPasswordController.Response,
  ConfirmForgotPasswordBody
> {
  constructor(private readonly confirmForgotPasswordUseCase: ConfirmForgotPasswordUseCase) {
    super();
  }

  protected override async handle(
    { body }: Controller.Request<'public', ConfirmForgotPasswordBody>,
  ): Promise<Controller.Response<ConfirmForgotPasswordController.Response>> {
    try {
      const { email, confirmationCode, password } = body;

      await this.confirmForgotPasswordUseCase.execute({
        email,
        confirmationCode,
        password,
      });

      return {
        statusCode: 204,
      };
    } catch {
      throw new BadRequest('Failed. Try again.');
    }
  }
}

export namespace ConfirmForgotPasswordController {
  export type Response = {
    accessToken: string;
    refreshToken: string;
  }
}
