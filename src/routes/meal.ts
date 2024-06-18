import { Router } from "express";
import { isAdminAuth } from "../middleware";
import * as mealController from "../meal/meal.controller";

const router = Router();

router.get("/", isAdminAuth, mealController.getAllMeals);
router.get("/:id", isAdminAuth, mealController.getOneMeal);
router.post("/", isAdminAuth, mealController.postMeal);
router.put("/:id", isAdminAuth, mealController.updateMeal);
router.post("/file", isAdminAuth, mealController.uploadMealFile);

export default router;
