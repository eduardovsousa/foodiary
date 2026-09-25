import 'reflect-metadata';

import { ConfirmForgotPasswordController } from '@application/controllers/auth/ConfirmForgotPasswordController.js';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter.js';

export const handler = lambdaHttpAdapter(ConfirmForgotPasswordController);
