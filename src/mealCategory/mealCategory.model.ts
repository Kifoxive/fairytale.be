import { Schema, model } from "mongoose";

const MealCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  subMealCategoriesId: [
    {
      type: Schema.Types.ObjectId,
      ref: "MealCategory",
    },
  ],
  order: {
    type: Number,
    required: false,
  },
  show: { type: Boolean, default: true },
});

const MealCategoryModel = model("MealCategory", MealCategorySchema);
export default MealCategoryModel;
