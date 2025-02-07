import express from "express";
import { authorize } from "../middlewares/user";
import postController from "../controllers/post";

const router = express.Router();

router.post("/create", authorize({}), postController.createPost);

export default router;
