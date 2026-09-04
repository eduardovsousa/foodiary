import * as z from 'zod/mini';

export const helloSchema = z.object({
  account: z.object({
    name: z.string().check(
      z.minLength(1, 'Name is required'),
    ),
  }),
  email: z.email('Invalid email'),
});

export type HelloBody = z.infer<typeof helloSchema>
