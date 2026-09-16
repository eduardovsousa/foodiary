import { Profile } from '@application/entities/Profile.js';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@infra/clients/dynamoClient.js';
import { AccountItem } from '@infra/database/dynamo/items/AccountItem.js';
import { Injectable } from '@kernel/decoratos/Injectable.js';
import { AppConfig } from '@shared/config/AppConfig.js';

@Injectable(AppConfig)
export class GetProfileAndGoalQuery {
  constructor(private readonly config: AppConfig) { }

  async execute({
    accountId,
  }: GetProfileAndGoalQuery.Input): Promise<GetProfileAndGoalQuery.Output> {
    const command = new QueryCommand({
      TableName: this.config.db.dynamodb.mainTable,
      Limit: 2,
      ProjectionExpression: '#PK, #SK, #name, #birthDate, #gender, #height, #weight, #calories, #proteins, #carbohydrates, #fats, #type',
      KeyConditionExpression: '#PK = :PK AND begins_with(#SK, :SK)',
      ExpressionAttributeNames: {
        '#PK': 'PK',
        '#SK': 'SK',
        '#name': 'name',
        '#birthDate': 'birthDate',
        '#gender': 'gender',
        '#height': 'height',
        '#weight': 'weight',
        '#calories': 'calories',
        '#proteins': 'proteins',
        '#carbohydrates': 'carbohydrates',
        '#fats': 'fats',
        '#type': 'type',
      },
      ExpressionAttributeValues: {
        ':PK': AccountItem.getPK(accountId),
        ':SK': `${AccountItem.getPK(accountId)}#`,
      },
    });

    const { Items = [] } = await dynamoClient.send(command);

    console.log(JSON.stringify({ Items }, null, 2));
  }
};

export namespace GetProfileAndGoalQuery {
  export type Input = {
    accountId: string;
  };

  export type Output = {
    profile: {
      name: string;
      birthDate: string;
      gender: Profile.Gender;
      height: number;
      weight: number;
    };
    goal: {
      calories: number;
      proteins: number;
      carbohydrates: number;
      fats: number;
    };
  };
}
