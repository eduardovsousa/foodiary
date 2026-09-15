import { Profile } from '@application/entities/Profile.js';
import { PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@infra/clients/dynamoClient.js';
import { Injectable } from '@kernel/decoratos/Injectable.js';
import { AppConfig } from '@shared/config/AppConfig.js';
import { ProfileItem } from '../items/ProfileItem.js';

@Injectable(AppConfig)
export class ProfileRepository {
  constructor(private readonly config: AppConfig) { }

  getPutCommandInput(profile: Profile): PutCommandInput {
    const profileItem = ProfileItem.fromEntity(profile);

    return {
      TableName: this.config.db.dynamodb.mainTable,
      Item: profileItem.toItem(),
    };
  }

  async create(profile: Profile): Promise<void> {
    await dynamoClient.send(
      new PutCommand(this.getPutCommandInput(profile)),
    );
  }
}
