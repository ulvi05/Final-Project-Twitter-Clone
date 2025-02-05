import express from "express";
import userController from "../controllers/user";
import { authorize } from "../middlewares/user";

const router = express.Router();

router.get("/profile/:username", authorize({}), userController.getUserProfile);
router.get("/suggested", authorize({}), userController.getSuggestedUsers);
router.post("/follow/:id", authorize({}), userController.followUnfollowUser);
router.post("/update", authorize({}), userController.updateUser);

export default router;
