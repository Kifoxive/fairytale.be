import { Router } from "express";
import * as reservationController from "../reservation/reservation.controller";

const router = Router();

router.post("/", reservationController.postReservation);
// router.get('/csv', auth, customerController.customersExportToCsv);
// router.get('/:id', auth, customerController.customerGet);
// router.post('/', auth, customerController.customerPost);
// router.put('/:id', auth, customerController.customerPut);

export default router;
