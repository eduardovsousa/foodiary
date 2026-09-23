import { IFileEventHandler } from '@application/contracts/IFileEventHandler.js';
import { S3Handler } from 'aws-lambda';

export function lambdaS3Adapter(eventHandler: IFileEventHandler): S3Handler {
  return async (event) => {
    const response = await Promise.allSettled(
      event.Records.map(record => eventHandler.handle({
        fileKey: record.s3.object.key,
      })),
    );

    const failedEvents = response.filter(response => response.status === 'rejected');

    for (const event of failedEvents) {
      console.log(JSON.stringify(event.reason, null, 2));
    }
  };
}
