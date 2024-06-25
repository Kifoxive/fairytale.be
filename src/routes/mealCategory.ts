import { Router } from "express";
import { isAdminAuth } from "../middleware";
import * as mealCategoryController from "../mealCategory/mealCategory.controller";

const router = Router();

router.get("/", isAdminAuth, mealCategoryController.getAllMealCategories);
router.get("/list", isAdminAuth, mealCategoryController.getMealCategoriesList);
router.get("/menu", mealCategoryController.getMenu);
router.get("/:id", isAdminAuth, mealCategoryController.getOneMealCategory);
router.post("/", isAdminAuth, mealCategoryController.postMealCategory);
router.put("/:id", isAdminAuth, mealCategoryController.updateMealCategory);

export default router;
