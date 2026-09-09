
import { z } from 'zod/mini';

export const schema = z.object({
  COGNITO_CLIENT_ID: z.string().check(
    z.minLength(1),
  ),
  COGNITO_CLIENT_SECRET: z.string().check(
    z.minLength(1),
  ),
  MAIN_TABLE_NAME: z.string().check(
    z.minLength(1),
  ),
});
export const env = schema.parse(process.env);
