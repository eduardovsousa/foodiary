import { Controller } from '@application/contracts/Controller.js';
import { SignInUseCase } from '@application/useCases/auth/SignInUseCase.js';
import { Injectable } from '@kernel/decoratos/Injectable.js';
import { Schema } from '@kernel/decoratos/Schema.js';
import { type SignInBody, signInSchema } from './schemas/signInSchema.js';

@Injectable(SignInUseCase)
@Schema(signInSchema)
export class SignInController extends Controller<
  SignInController.Response,
  SignInBody
> {
  constructor(private readonly signInUseCase: SignInUseCase) {
    super();
  }

  protected override async handle(
    { body }: Controller.Request<SignInBody>,
  ): Promise<Controller.Response<SignInController.Response>> {
    const { email, password } = body;

    const {
      accessToken,
      refreshToken,
    } = await this.signInUseCase.execute({
      email,
      password,
    });

    return {
      statusCode: 200,
      body: {
        accessToken,
        refreshToken,
      },
    };
  }
}

export namespace SignInController {
  export type Response = {
    accessToken: string;
    refreshToken: string;
  }
}
