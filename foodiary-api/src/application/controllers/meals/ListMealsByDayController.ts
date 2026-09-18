import { Controller } from '@application/contracts/Controller.js';
import { Meal } from '@application/entities/Meal.js';
import { ListMealsByDayQuery } from '@application/query/ListMealsByDayQuery.js';
import { Injectable } from '@kernel/decoratos/Injectable.js';
import { CreateMealBody } from './schemas/createMealSchema.js';
import { listMealsByDaySchema } from './schemas/listMealsByDaySchema.js';

@Injectable(ListMealsByDayQuery)
export class ListMealsByDayController extends Controller<
  'private', ListMealsByDayController.Response
> {
  constructor(private readonly listMealsByDayQuery: ListMealsByDayQuery) {
    super();
  }

  protected override async handle({
    accountId,
    queryParams,
  }: Controller.Request<'private', CreateMealBody>):
    Promise<Controller.Response<ListMealsByDayController.Response>> {
    const { date } = listMealsByDaySchema.parse(queryParams);

    const { meals } = await this.listMealsByDayQuery.execute({
      accountId,
      date,
    });

    return {
      statusCode: 200,
      body: {
        meals,
      },
    };
  }
}

export namespace ListMealsByDayController {
  export type Response = {
    meals: {
      id: string;
      createdAt: string;
      name: string;
      icon: string;
      foods: Meal.Food[];
    }[];
  }
}
