import { HelloController } from '../../application/controllers/HelloController.js';
import { lambdaHttpAdapter } from '../adapters/lambdaHttpAdapter.js';

const controller = new HelloController();

export const handler = lambdaHttpAdapter(controller);
