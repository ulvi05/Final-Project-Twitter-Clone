import { Request, Response } from "express";
import User from "../mongoose/schema/user";
import { IUser } from "../types/user";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Error in getUserProfile: ", error);
  }
};

export const followUnfollowUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById((req.user as IUser)._id);

    if (id === req.user?._id.toString()) {
      res.status(400).json({ error: "You can't follow/unfollow yourself" });
      return;
    }

    if (!userToModify || !currentUser) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    const isFollowing = currentUser.following.some(
      (followingId) => followingId.toString() === id
    );

    if (isFollowing) {
      //unfollow user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user?._id } });
      await User.findByIdAndUpdate(req.user?._id, { $pull: { following: id } });
    } else {
      //follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user?._id } });
      await User.findByIdAndUpdate(req.user?._id, { $push: { following: id } });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Error in followUnfollowUser: ", error);
  }
};
