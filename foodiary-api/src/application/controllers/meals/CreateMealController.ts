import { Controller } from '@application/contracts/Controller.js';
import { SignInUseCase } from '@application/useCases/auth/SignInUseCase.js';
import { Injectable } from '@kernel/decoratos/Injectable.js';

@Injectable(SignInUseCase)
export class CreateMealController extends Controller<
  'private', CreateMealController.Response
> {
  protected override async handle({
    accountId,
  }: Controller.Request<'private'>):
    Promise<Controller.Response<CreateMealController.Response>> {

    return {
      statusCode: 201,
      body: {
        accountId,
      },
    };
  }
}

export namespace CreateMealController {
  export type Response = {
    accountId: string;
  }
}
