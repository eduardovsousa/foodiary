
import { IQueueConsumer } from '@application/contracts/IQueueConsumer.js';
import { Registry } from '@kernel/di/Registry.js';
import { Constructor } from '@shared/types/Constructor.js';
import { SQSHandler } from 'aws-lambda';

export function lambdaSQSAdapter(queueConsumerImpl: Constructor<IQueueConsumer<any>>): SQSHandler {
  return async (event) => {
    const queueConsumer = Registry.getInstance().resolve(queueConsumerImpl);

    await Promise.all(
      event.Records.map(async record => {
        const message = JSON.parse(record.body);

        await queueConsumer.process(message);
      }),
    );
  };
}
