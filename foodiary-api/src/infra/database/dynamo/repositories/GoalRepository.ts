import { Goal } from '@application/entities/Goal.js';
import { GetCommand, PutCommand, PutCommandInput, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@infra/clients/dynamoClient.js';
import { Injectable } from '@kernel/decoratos/Injectable.js';
import { AppConfig } from '@shared/config/AppConfig.js';
import { GoalItem } from '../items/GoalItem.js';

@Injectable(AppConfig)
export class GoalRepository {
  constructor(private readonly config: AppConfig) { }

  async findByAccountId(accountId: string): Promise<Goal | null> {
    const command = new GetCommand({
      TableName: this.config.db.dynamodb.mainTable,
      Key: {
        PK: GoalItem.getPK(accountId),
        SK: GoalItem.getSK(accountId),
      },
    });

    const { Item: goalItem } = await dynamoClient.send(command);

    if (!goalItem) {
      return null;
    }

    return GoalItem.toEntity(goalItem as GoalItem.ItemType);
  }

  async save(goal: Goal) {
    const goalItem = GoalItem.fromEntity(goal).toItem();

    const command = new UpdateCommand({
      TableName: this.config.db.dynamodb.mainTable,
      Key: {
        PK: goalItem.PK,
        SK: goalItem.SK,
      },
      UpdateExpression: 'SET #calories = :calories, #carbohydrates = :carbohydrates, #fats = :fats, #proteins = :proteins',
      ExpressionAttributeNames: {
        '#calories': 'calories',
        '#carbohydrates': 'carbohydrates',
        '#fats': 'fats',
        '#proteins': 'proteins',
      },
      ExpressionAttributeValues: {
        ':calories': goalItem.calories,
        ':carbohydrates': goalItem.carbohydrates,
        ':fats': goalItem.fats,
        ':proteins': goalItem.proteins,
      },
      ReturnValues: 'NONE',
    });

    await dynamoClient.send(command);
  }

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
