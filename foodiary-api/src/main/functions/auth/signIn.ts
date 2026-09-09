import 'reflect-metadata';

import { SignInController } from '@application/controllers/auth/SignInController.js';
import { Registry } from '@kernel/di/Registry.js';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter.js';

const controller = Registry.getInstance().resolve(SignInController);

export const handler = lambdaHttpAdapter(controller);
