import { Controller } from '@application/contracts/Controller.js';
import { SignInUseCase } from '@application/useCases/auth/SignInUseCase.js';
import { Injectable } from '@kernel/decorators/Injectable.js';
import { Schema } from '@kernel/decorators/Schema.js';
import { SignInBody, signInSchema } from './schemas/signInSchema.js';

@Injectable()
@Schema(signInSchema)
export class SignInController extends Controller<
  'public', SignInController.Response,
  SignInBody
> {
  constructor(private readonly signInUseCase: SignInUseCase) {
    super();
  }

  protected override async handle(
    { body }: Controller.Request<'public', SignInBody>,
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
