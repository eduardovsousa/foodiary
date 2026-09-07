import 'reflect-metadata';

import { HelloController } from '@application/controllers/HelloController.js';
import { HelloUseCase } from '@application/useCases/HelloUseCase.js';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter.js';

const controller = new HelloController(new HelloUseCase());

export const handler = lambdaHttpAdapter(controller);
