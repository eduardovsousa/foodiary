import { IQueueConsumer } from '@application/contracts/IQueueConsumer.js';
import { ProcessMealUseCase } from '@application/useCases/meals/ProcessMealUseCase.js';
import { MealsQueueGateway } from '@infra/gateways/MealsQueueGateway.js';
import { Injectable } from '@kernel/decorators/Injectable.js';

@Injectable()
export class MealsQueueConsumer implements IQueueConsumer<MealsQueueGateway.Message> {
  constructor(private readonly processMealUseCase: ProcessMealUseCase) { }

  async process({ accountId, mealId }: MealsQueueGateway.Message): Promise<void> {
    await this.processMealUseCase.execute({ accountId, mealId });
  }

}
