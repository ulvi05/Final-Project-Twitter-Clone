import express from "express";
import conversationController from "../controllers/conversation";
import { authorize } from "../middlewares/user";
import validateSchema from "../middlewares/validator";
import { conversationCreateSchema } from "../validation/conversation";

const router = express.Router();

router.get("/", authorize({}), conversationController.getAll);

router.get("/user", authorize({}), conversationController.getUserConversation);

router.post(
  "/",
  authorize({}),
  validateSchema(conversationCreateSchema),
  conversationController.create
);

export default router;
