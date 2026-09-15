import { Goal } from '@application/entities/Goal.js';
import { PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@infra/clients/dynamoClient.js';
import { Injectable } from '@kernel/decoratos/Injectable.js';
import { AppConfig } from '@shared/config/AppConfig.js';
import { GoalItem } from '../items/GoalItem.js';

@Injectable(AppConfig)
export class GoalRepository {
  constructor(private readonly config: AppConfig) { }

  getPutCommandInput(goal: Goal): PutCommandInput {
    const goalItem = GoalItem.fromEntity(goal);

    return {
      TableName: this.config.db.dynamodb.mainTable,
      Item: goalItem.toItem(),
    };
  }

  async create(goal: Goal): Promise<void> {
    await dynamoClient.send(
      new PutCommand(this.getPutCommandInput(goal)),
    );
  }
}
