import 'reflect-metadata';

import { ConfirmForgotPasswordController } from '@application/controllers/auth/ConfirmForgotPasswordController.js';
import { Registry } from '@kernel/di/Registry.js';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter.js';

const controller = Registry.getInstance().resolve(ConfirmForgotPasswordController);

export const handler = lambdaHttpAdapter(controller);
