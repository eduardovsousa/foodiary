import { IQueueConsumer } from '@application/contracts/IQueueConsumer.js';
import { MealsQueueGateway } from '@infra/gateways/MealsQueueGateway.js';
import { Injectable } from '@kernel/decorators/Injectable.js';

@Injectable()
export class MealsQueueConsumer implements IQueueConsumer<MealsQueueGateway.Message> {
  async process({ accountId, mealId }: MealsQueueGateway.Message): Promise<void> {
    console.log(JSON.stringify({ accountId, mealId }, null, 2));
  }

}
