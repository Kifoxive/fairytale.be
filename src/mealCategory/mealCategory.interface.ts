import { z } from "zod";

export const mealCategoryFormSchema = () =>
  z.object({
    name: z.string(),
    description: z.string(),
    subMealCategoriesId: z.array(z.string()),
  });

export type MealCategoryForm = z.infer<
  ReturnType<typeof mealCategoryFormSchema>
>;

export type IMealCategory = {
  mealCategory_id: string;
  name: string;
  description: string | null;
  subMealCategoriesId: string[];
  show: boolean;
  order: number | null;
};

export type PostMealCategory = {
  request: {
    data: MealCategoryForm;
  };
  response: {
    data: IMealCategory;
  };
};
