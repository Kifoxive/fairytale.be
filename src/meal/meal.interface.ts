import { z } from "zod";
import { Schema } from "mongoose";

// request for meal creating
export const postMealRequestSchema = () =>
  z.object({
    data: z.object({
      name: z.string(),
      description: z.string(),
      price: z.number(),
      weight: z.string(),
      allergens: z.array(z.string()),
      mealCategory_id: z.string(),
      imgUrl: z.string().nullable(),
    }),
  });

export type PostMealRequest = z.infer<ReturnType<typeof postMealRequestSchema>>;

export type IMeal = {
  meal_id: Schema.Types.ObjectId;
  name: string;
  price: number;
  weight: string;
  allergens: string[];
  description: string | null;
  order: number;
  mealCategory_id: string;
  imgUrl: string;
  show: boolean;
};
