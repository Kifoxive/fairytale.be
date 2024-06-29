"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MealSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    weight: {
        type: String,
        required: true,
    },
    allergens: {
        type: [String],
        default: [],
        required: false,
    },
    mealCategory_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "MealCategory",
        required: true,
    },
    imgUrl: { type: String, required: false },
    order: {
        type: Number,
        required: false,
    },
    show: { type: Boolean, default: true },
});
const MealModel = (0, mongoose_1.model)("Meal", MealSchema);
exports.default = MealModel;
//# sourceMappingURL=meal.model.js.map