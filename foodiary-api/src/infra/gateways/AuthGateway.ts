import { InvalidCredentials } from '@application/errors/application/InvalidCredentials.js';
import { InvalidRefreshToken } from '@application/errors/application/InvalidRefreshToken.js';
import {
    AdminDeleteUserCommand,
    ConfirmForgotPasswordCommand,
    ForgotPasswordCommand,
    GetTokensFromRefreshTokenCommand,
    InitiateAuthCommand,
    SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { cognitoClient } from '@infra/clients/cognitoClient.js';
import { Injectable } from '@kernel/decorators/Injectable.js';
import { AppConfig } from '@shared/config/AppConfig.js';
import { createHmac } from 'node:crypto';

@Injectable()
export class AuthGateway {
  constructor(private readonly config: AppConfig) { }

  async signUp({
    email,
    password,
    internalId,
  }: AuthGateway.SignUpParams): Promise<AuthGateway.SignUpResult> {
    const command = new SignUpCommand({
      ClientId: this.config.auth.cognito.client.id,
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: 'custom:internalId', Value: internalId },
      ],
      SecretHash: this.getSecretHash(email),
    });

    const { UserSub: externalId } = await cognitoClient.send(command);

    if (!externalId) {
      throw new Error(`Cannot signup user: ${email}`);
    }

    return {
      externalId,
    };
  }

  async signIn({ email, password }: AuthGateway.SignInParams): Promise<AuthGateway.SignInResult> {
    try {
      const command = new InitiateAuthCommand({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: this.config.auth.cognito.client.id,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
          SECRET_HASH: this.getSecretHash(email),
        },
      });

      const { AuthenticationResult } = await cognitoClient.send(command);

      if (!AuthenticationResult?.AccessToken || !AuthenticationResult.RefreshToken) {
        throw new Error(`Cannot authenticate user: ${email}`);
      }

      return {
        accessToken: AuthenticationResult.AccessToken,
        refreshToken: AuthenticationResult.RefreshToken,
      };
    } catch {
      throw new InvalidCredentials();
    }
  }

  async refreshToken({
    refreshToken,
  }: AuthGateway.RefreshTokenParams): Promise<AuthGateway.RefreshTokenResult> {
    try {
      const command = new GetTokensFromRefreshTokenCommand({
        ClientId: this.config.auth.cognito.client.id,
        RefreshToken: refreshToken,
        ClientSecret: this.config.auth.cognito.client.secret,
      });

      const { AuthenticationResult } = await cognitoClient.send(command);

      if (!AuthenticationResult?.AccessToken || !AuthenticationResult.RefreshToken) {
        throw new Error('Cannot refresh token.');
      }

      return {
        accessToken: AuthenticationResult.AccessToken,
        refreshToken: AuthenticationResult.RefreshToken,
      };
    } catch {
      throw new InvalidRefreshToken();
    }
  }

  async forgotPassword({ email }: AuthGateway.ForgotPasswordParams): Promise<void> {
    const command = new ForgotPasswordCommand({
      ClientId: this.config.auth.cognito.client.id,
      Username: email,
      SecretHash: this.getSecretHash(email),
    });

    await cognitoClient.send(command);
  }

  async confirmForgotPassword({
    email,
    confirmationCode,
    password,
  }: AuthGateway.ConfirmForgotPasswordParams): Promise<void> {
    const command = new ConfirmForgotPasswordCommand({
      ClientId: this.config.auth.cognito.client.id,
      ConfirmationCode: confirmationCode,
      Username: email,
      Password: password,
      SecretHash: this.getSecretHash(email),
    });

    await cognitoClient.send(command);
  }

  async deleteUser({ externalId }: AuthGateway.DeleteUserParams) {
    const command = new AdminDeleteUserCommand({
      UserPoolId: this.config.auth.cognito.pool.id,
      Username: externalId,
    });

    await cognitoClient.send(command);
  }

  private getSecretHash(email: string): string {
    const { id, secret } = this.config.auth.cognito.client;

    return createHmac('SHA256', secret)
      .update(`${email}${id}`)
      .digest('base64');
  }
};

export namespace AuthGateway {
  export type SignUpParams = {
    email: string;
    password: string;
    internalId: string;
  }

  export type SignUpResult = {
    externalId: string;
  }

  export type SignInParams = {
    email: string;
    password: string;
  }

  export type SignInResult = {
    accessToken: string;
    refreshToken: string;
  }

  export type RefreshTokenParams = {
    refreshToken: string;
  }

  export type RefreshTokenResult = {
    accessToken: string;
    refreshToken: string;
  }

  export type ForgotPasswordParams = {
    email: string;
  }

  export type ConfirmForgotPasswordParams = {
    email: string;
    confirmationCode: string;
    password: string;
  }

  export type DeleteUserParams = {
    externalId: string;
  }
}
