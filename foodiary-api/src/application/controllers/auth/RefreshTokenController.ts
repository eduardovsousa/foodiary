import { Controller } from '@application/contracts/Controller.js';
import { RefreshTokenUseCase } from '@application/useCases/auth/RefreshTokenUseCase.js';
import { Injectable } from '@kernel/decoratos/Injectable.js';
import { Schema } from '@kernel/decoratos/Schema.js';
import { RefreshTokenBody, refreshTokenSchema } from './schemas/refreshTokenSchema.js';

@Injectable(RefreshTokenUseCase)
@Schema(refreshTokenSchema)
export class RefreshTokenController extends Controller<
  'public', RefreshTokenController.Response,
  RefreshTokenBody
> {
  constructor(private readonly refreshTokenUseCase: RefreshTokenUseCase) {
    super();
  }

  protected override async handle(
    { body }: Controller.Request<'public', RefreshTokenBody>,
  ): Promise<Controller.Response<RefreshTokenController.Response>> {
    const { refreshToken } = body;

    const {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    } = await this.refreshTokenUseCase.execute({
      refreshToken,
    });

    return {
      statusCode: 200,
      body: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    };
  }
}

export namespace RefreshTokenController {
  export type Response = {
    accessToken: string;
    refreshToken: string;
  }
}
