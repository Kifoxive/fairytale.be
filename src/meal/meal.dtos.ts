import { IMeal } from "./meal.interface";

export function MealDto(model: any): IMeal {
  return {
    meal_id: model._id,
    name: model.name,
    price: model.price,
    weight: model.weight,
    allergens: model.allergens,
    description: model.description,
    order: model.order,
    mealCategory_id: model.mealCategory_id,
    imgUrl: model.imgUrl,
    show: model.show,
  };
}
