import { Goal } from '@application/entities/Goal.js';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@infra/clients/dynamoClient.js';
import { Injectable } from '@kernel/decoratos/Injectable.js';
import { AppConfig } from '@shared/config/AppConfig.js';
import { GoalItem } from '../items/GoalItem.js';

@Injectable(AppConfig)
export class GoalRepository {
  constructor(private readonly config: AppConfig) { }

  async create(goal: Goal): Promise<void> {
    const goalItem = GoalItem.fromEntity(goal);

    const command = new PutCommand({
      TableName: this.config.db.dynamodb.mainTable,
      Item: goalItem.toItem(),
    });

    await dynamoClient.send(command);
  }
}
