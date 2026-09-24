import { Controller } from '@application/contracts/Controller.js';
import { SignUpUseCase } from '@application/useCases/auth/SignUpUseCase.js';
import { Injectable } from '@kernel/decorators/Injectable.js';
import { Schema } from '@kernel/decorators/Schema.js';
import { SignUpBody, signUpSchema } from './schemas/signUpSchema.js';

@Injectable()
@Schema(signUpSchema)
export class SignUpController extends Controller<
  'public', SignUpController.Response,
  SignUpBody
> {
  constructor(private readonly signUpUseCase: SignUpUseCase) {
    super();
  }

  protected override async handle(
    { body }: Controller.Request<'public', SignUpBody>,
  ): Promise<Controller.Response<SignUpController.Response>> {
    const { account, profile } = body;

    const {
      accessToken,
      refreshToken,
    } = await this.signUpUseCase.execute({
      account,
      profile,
    });

    return {
      statusCode: 201,
      body: {
        accessToken,
        refreshToken,
      },
    };
  }
}

export namespace SignUpController {
  export type Response = {
    accessToken: string;
    refreshToken: string;
  }
}
