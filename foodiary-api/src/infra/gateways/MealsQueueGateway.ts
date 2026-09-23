import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { sqsClient } from '@infra/clients/sqsClient.js';
import { Injectable } from '@kernel/decorators/Injectable.js';
import { AppConfig } from '@shared/config/AppConfig.js';

@Injectable(AppConfig)
export class MealsQueueGateway {
  constructor(private readonly appConfig: AppConfig) { }

  async publish(message: MealsQueueGateway.Message) {
    const command = new SendMessageCommand({
      QueueUrl: this.appConfig.queues.mealsQueueUrl,
      MessageBody: JSON.stringify(message),
    });

    await sqsClient.send(command);
  }
}

export namespace MealsQueueGateway {
  export type Message = {
    accountId: string;
    mealId: string;
  }
}
