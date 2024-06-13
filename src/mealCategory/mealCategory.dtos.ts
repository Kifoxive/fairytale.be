import { IMealCategory } from "./mealCategory.interface";

export function MealCategoryDto(model: any): IMealCategory {
  return {
    mealCategory_id: model._id,
    name: model.name,
    description: model.description,
    subMealCategoriesId: model.subMealCategoriesId,
    show: model.show,
    order: model.order,
  };
}
