import express from "express";
import passport from "passport";
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

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  authController.googleAuth
);

export default router;
