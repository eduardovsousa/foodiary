import * as z from 'zod/mini';

export const listMealsByDaySchema = z.object({
  date: z.pipe(
    z.string().check(
      z.minLength(1, '"date" is required'),
      z.iso.date('"date" should be a valid date (YYYY-MM-DD)'),
    ),
    z.transform(date => new Date(date)),
  ),
});

export type ListMealsByDaySchemaBody = z.infer<typeof listMealsByDaySchema>;
