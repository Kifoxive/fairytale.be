import { Schema, model } from "mongoose";

const MealSchema = new Schema({
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
    type: Schema.Types.ObjectId,
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

const MealModel = model("Meal", MealSchema);
export default MealModel;
