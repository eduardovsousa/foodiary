import { Controller } from '@application/contracts/Controller.js';
import { Meal } from '@application/entities/Meal.js';
import { GetMealByIdUseCase } from '@application/useCases/meals/GetMealByIdUseCase.js';
import { Injectable } from '@kernel/decoratos/Injectable.js';

@Injectable(GetMealByIdUseCase)
export class GetMealByIdController extends Controller<
  'private', GetMealByIdController.Response
> {
  constructor(private readonly getMealByIdUseCase: GetMealByIdUseCase) {
    super();
  }

  protected override async handle({
    accountId, params,
  }: GetMealByIdController.Request): Promise<Controller.Response<GetMealByIdController.Response>> {
    const { mealId } = params;

    const { meal } = await this.getMealByIdUseCase.execute({ accountId, mealId });

    return {
      statusCode: 200,
      body: {
        meal,
      },
    };
  }
}

export namespace GetMealByIdController {
  export type Params = {
    mealId: string;
  }

  export type Request = Controller.Request<
    'private',
    Record<string, unknown>,
    GetMealByIdController.Params
  >;

  export type Response = {
    meal: {
      id: string;
      status: Meal.Status;
      inputType: Meal.InputType;
      inputFileKey: string;
      name: string;
      icon: string;
      foods: Meal.Food[];
      createdAt: Date;
    }
  }
}
