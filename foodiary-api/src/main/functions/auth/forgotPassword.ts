import 'reflect-metadata';

import { ForgotPasswordController } from '@application/controllers/auth/ForgotPasswordController.js';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter.js';

export const handler = lambdaHttpAdapter(ForgotPasswordController);
