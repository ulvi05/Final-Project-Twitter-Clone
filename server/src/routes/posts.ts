import express from "express";
import { authorize } from "../middlewares/user";
import postController from "../controllers/post";

const router = express.Router();

router.get("/all", authorize({}), postController.getAllPosts);
router.get("/following", authorize({}), postController.getFollowingPosts);
router.get("/likes/:id", authorize({}), postController.getLikedPosts);
router.get("/user/:username", authorize({}), postController.getUserPosts);
router.post("/create", authorize({}), postController.createPost);
router.post("/like/:id", authorize({}), postController.likeUnlikePost);
router.post("/comment/:id", authorize({}), postController.commentOnPost);
router.delete("/:id", authorize({}), postController.deletePost);

export default router;
