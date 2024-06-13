import { Router } from "express";
import { isAdminAuth } from "../middleware";
import * as mealController from "../meal/meal.controller";

const router = Router();

router.post("/", isAdminAuth, mealController.postMeal);
// router.get('/csv', auth, customerController.customersExportToCsv);
// router.get('/:id', auth, customerController.customerGet);
// router.post('/', auth, customerController.customerPost);
// router.put('/:id', auth, customerController.customerPut);

export default router;
