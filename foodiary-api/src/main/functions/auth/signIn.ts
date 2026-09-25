import 'reflect-metadata';

import { SignInController } from '@application/controllers/auth/SignInController.js';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter.js';

export const handler = lambdaHttpAdapter(SignInController);
