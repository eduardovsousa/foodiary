import 'reflect-metadata';

import { RefreshTokenController } from '@application/controllers/auth/RefreshTokenController.js';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter.js';

export const handler = lambdaHttpAdapter(RefreshTokenController);
