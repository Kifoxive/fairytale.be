import { z } from "zod";

// request for meal creating
export const mealFormSchema = () =>
  z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    weight: z.string(),
    allergens: z.array(z.string()),
    mealCategory_id: z.string(),
    imgUrl: z.string().nullable(),
  });

// post meal request
const postMealRequestSchema = () =>
  z.object({
    data: mealFormSchema(),
  });

export type MealForm = z.infer<ReturnType<typeof mealFormSchema>>;
export type PostMealRequest = z.infer<ReturnType<typeof postMealRequestSchema>>;
