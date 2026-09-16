import { Controller } from '@application/contracts/Controller.js';
import { SignInUseCase } from '@application/useCases/auth/SignInUseCase.js';
import { Injectable } from '@kernel/decoratos/Injectable.js';

@Injectable(SignInUseCase)
export class GetMeController extends Controller<
  'private', GetMeController.Response
> {
  protected override async handle({
    accountId,
  }: Controller.Request<'private'>):
    Promise<Controller.Response<GetMeController.Response>> {

    return {
      statusCode: 201,
      body: {
        accountId,
      },
    };
  }
}

export namespace GetMeController {
  export type Response = {
    accountId: string;
  }
}
