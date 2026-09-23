import 'reflect-metadata';

import { MealsQueueConsumer } from '@application/queues/MealsQueueConsumer.js';
import { lambdaSQSAdapter } from '@main/adapters/lambdaSQSAdapter.js';

export const handler = lambdaSQSAdapter(MealsQueueConsumer);
