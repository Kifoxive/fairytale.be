import { Router } from "express";
import { isAdminAuth } from "../middleware";
import * as reservationController from "../reservation/reservation.controller";

const router = Router();

router.post("/", isAdminAuth, reservationController.postReservation);
router.get("/", isAdminAuth, reservationController.getAllReservations);
router.patch(
  "/change-status",
  isAdminAuth,
  reservationController.changeReservationStatus
);

export default router;
