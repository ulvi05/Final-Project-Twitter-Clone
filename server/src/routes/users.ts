import express from "express";
import { getUserProfile } from "../controllers/user";

const router = express.Router();

router.get("/profile/:username", getUserProfile);
router.get("/suggested", getUserProfile);
// router.post("/follow/:id", followUnfollowUser);
// router.post("/update", updateUserProfile);

export default router;
