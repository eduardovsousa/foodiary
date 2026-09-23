
import { z } from 'zod/mini';

export const schema = z.object({
  // Cognito
  COGNITO_CLIENT_ID: z.string().check(z.minLength(1)),
  COGNITO_CLIENT_SECRET: z.string().check(z.minLength(1)),
  COGNITO_POOL_ID: z.string().check(z.minLength(1)),

  // Database
  MAIN_TABLE_NAME: z.string().check(z.minLength(1)),

  // Bucket
  MEALS_BUCKET: z.string().check(z.minLength(1)),

  // CDN
  MEALS_CDN_DOMAIN_NAME: z.string().check(z.minLength(1)),
});
export const env = schema.parse(process.env);
