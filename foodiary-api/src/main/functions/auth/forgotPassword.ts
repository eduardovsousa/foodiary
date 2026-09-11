import 'reflect-metadata';

import { ForgotPasswordController } from '@application/controllers/auth/ForgotPasswordController.js';
import { Registry } from '@kernel/di/Registry.js';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter.js';

const controller = Registry.getInstance().resolve(ForgotPasswordController);

export const handler = lambdaHttpAdapter(controller);
