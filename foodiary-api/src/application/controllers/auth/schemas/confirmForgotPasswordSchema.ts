import * as z from 'zod/mini';

export const confirmForgotPasswordSchema = z.object({
  email: z.string().check(
    z.minLength(1, '"email" is required'),
    z.email('Invalid email'),
  ),
  confirmationCode: z.string().check(
    z.minLength(1, '"confirmationCode" is required'),
  ),
  password: z.string().check(
    z.minLength(8, '"password" should be at least 8 characters long'),
  ),
});

export type ConfirmForgotPasswordBody = z.infer<typeof confirmForgotPasswordSchema>;
