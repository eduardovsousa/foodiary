import * as z from 'zod/mini';

export const updateGoalSchema = z.object({
  calories: z.number().check(
    z.minimum(1, '"calories" is required'),
  ),
  carbohydrates: z.number().check(
    z.minimum(1, '"carbohydrates" is required'),
  ),
  fats: z.number().check(
    z.minimum(1, '"fats" is required'),
  ),
  proteins: z.number().check(
    z.minimum(1, '"proteins" is required'),
  ),
});

export type UpdateGoalBody = z.infer<typeof updateGoalSchema>;
