import { Router } from "express";
import { checkAuth } from "../middleware";

import * as authController from "../auth/auth.controller";

const router = Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/refresh", authController.refresh);
router.get("/me", checkAuth, authController.getMe);

export default router;
