import 'reflect-metadata';

import { SignUpController } from '@application/controllers/auth/SignUpController.js';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter.js';

export const handler = lambdaHttpAdapter(SignUpController);
