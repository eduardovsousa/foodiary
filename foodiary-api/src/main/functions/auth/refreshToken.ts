import 'reflect-metadata';

import { RefreshTokenController } from '@application/controllers/auth/RefreshTokenController.js';
import { Registry } from '@kernel/di/Registry.js';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter.js';

const controller = Registry.getInstance().resolve(RefreshTokenController);

export const handler = lambdaHttpAdapter(controller);
