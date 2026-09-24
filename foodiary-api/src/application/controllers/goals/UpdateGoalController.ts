import { Controller } from '@application/contracts/Controller.js';
import { UpdateGoalUseCase } from '@application/useCases/goals/UpdateGoalUseCase.js';
import { Injectable } from '@kernel/decorators/Injectable.js';
import { Schema } from '@kernel/decorators/Schema.js';
import { UpdateGoalBody, updateGoalSchema } from './schemas/updateGoalSchema.js';

@Injectable()
@Schema(updateGoalSchema)
export class UpdateGoalController extends Controller<
  'private', UpdateGoalController.Response
> {
  constructor(private readonly updateGoalUseCase: UpdateGoalUseCase) {
    super();
  }

  protected override async handle({
    accountId,
    body,
  }: Controller.Request<'private', UpdateGoalBody>):
    Promise<Controller.Response<UpdateGoalController.Response>> {
    const {
      calories,
      carbohydrates,
      fats,
      proteins,
    } = body;

    await this.updateGoalUseCase.execute({
      accountId,
      calories,
      carbohydrates,
      fats,
      proteins,
    });

    return {
      statusCode: 204,
    };
  }
}

export namespace UpdateGoalController {
  export type Response = null;
}
