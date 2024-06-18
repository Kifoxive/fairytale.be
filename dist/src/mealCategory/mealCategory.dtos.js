"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealCategoryDto = void 0;
function MealCategoryDto(model) {
    return {
        mealCategory_id: model._id,
        name: model.name,
        description: model.description,
        subMealCategoriesId: model.subMealCategoriesId,
        show: model.show,
        order: model.order,
    };
}
exports.MealCategoryDto = MealCategoryDto;
//# sourceMappingURL=mealCategory.dtos.js.map