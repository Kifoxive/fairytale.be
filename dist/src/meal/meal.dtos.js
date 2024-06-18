"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealDto = void 0;
function MealDto(model) {
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
exports.MealDto = MealDto;
//# sourceMappingURL=meal.dtos.js.map