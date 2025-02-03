import express from "express";
import { followUnfollowUser, getUserProfile } from "../controllers/user";
import { authorize } from "../middlewares/user";

const router = express.Router();

router.get("/profile/:username", authorize({}), getUserProfile);
router.get("/suggested", authorize({}), getUserProfile);
router.post("/follow/:id", authorize({}), followUnfollowUser);
// router.post("/update", updateUserProfile);

export default router;
