import { Router } from "express";
import * as userController from "../user/user.controller";
import checkAuth from "../middleware/checkAuth";

const router = Router();

router.get("/emailAvailability", userController.getEmailAvailability);
// router.get('/csv', auth, customerController.customersExportToCsv);
// router.get('/:id', auth, customerController.customerGet);
// router.post('/', auth, customerController.customerPost);
// router.put('/:id', auth, customerController.customerPut);

export default router;
