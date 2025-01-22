import express from "express";
import authController from "../controllers/auth";
import { authenticate } from "../middlewares/user";
import validateSchema from "../middlewares/validator";
import {
  forgotPasswordSchema,
  registerSchema,
  resetPasswordSchema,
} from "../validation/auth";

const router = express.Router();

router.post("/login", authenticate, authController.login);

router.post("/signup", validateSchema(registerSchema), authController.signup);

router.post("/logout", authController.logout);

// router.post(
//   "/forgot-password",
//   validateSchema(forgotPasswordSchema),
//   authController.forgotPassword
// );

// router.post(
//   "/reset-password",
//   validateSchema(resetPasswordSchema),
//   authController.resetPassword
// );

export default router;
