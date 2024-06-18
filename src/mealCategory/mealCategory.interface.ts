import { z } from "zod";
import { Schema } from "mongoose";

// request for meal category creating
export const postMealCategoryRequestSchema = () =>
  z.object({
    data: z.object({
      name: z.string(),
      description: z.string(),
      subMealCategoriesId: z.array(z.string()),
    }),
  });

export type PostMealCategoryRequest = z.infer<
  ReturnType<typeof postMealCategoryRequestSchema>
>;

export type IMealCategory = {
  mealCategory_id: Schema.Types.ObjectId;
  name: string;
  description: string | null;
  subMealCategoriesId: Schema.Types.ObjectId[];
  show: boolean;
  order: number | null;
};
