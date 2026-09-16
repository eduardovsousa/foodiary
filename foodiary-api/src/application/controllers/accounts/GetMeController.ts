import { Controller } from '@application/contracts/Controller.js';
import { GetProfileAndGoalQuery } from '@application/query/GetProfileAndGoalQuery.js';
import { Injectable } from '@kernel/decoratos/Injectable.js';

@Injectable( GetProfileAndGoalQuery)
export class GetMeController extends Controller<
  'private', GetMeController.Response
> {
  constructor(private readonly getProfileAndGoalQuery: GetProfileAndGoalQuery) {
    super();
  }

  protected override async handle({
    accountId,
  }: Controller.Request<'private'>):
    Promise<Controller.Response<GetMeController.Response>> {
    await this.getProfileAndGoalQuery.execute({ accountId });

    return {
      statusCode: 200,
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
