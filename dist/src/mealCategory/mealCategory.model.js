"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MealCategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    subMealCategoriesId: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "MealCategory",
        },
    ],
    order: {
        type: Number,
        required: false,
    },
    show: { type: Boolean, default: true },
});
const MealCategoryModel = (0, mongoose_1.model)("MealCategory", MealCategorySchema);
exports.default = MealCategoryModel;
//# sourceMappingURL=mealCategory.model.js.map