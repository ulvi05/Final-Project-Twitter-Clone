import { Request, Response } from "express";
import User from "../mongoose/schema/user";
import { IUser } from "../types/user";
import Notification from "../mongoose/schema/notification";
import { comparePasswords, hashPassword } from "../utils/bcrypt";

const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserProfile: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const followUnfollowUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById((req.user as IUser)._id);

    if (!userToModify || !currentUser) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    if (id === req.user?._id.toString()) {
      res.status(400).json({ error: "You can't follow/unfollow yourself" });
      return;
    }

    const isFollowing = currentUser.following.some(
      (followingId) => followingId.toString() === id
    );

    if (isFollowing) {
      //unfollow user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user?._id } });
      await User.findByIdAndUpdate(req.user?._id, { $pull: { following: id } });
      res.status(200).json({ message: "User unfollowed successfully" });
      return;
    } else {
      //Follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user?._id } });
      await User.findByIdAndUpdate(req.user?._id, { $push: { following: id } });

      //Send Notification
      const newNotification = new Notification({
        type: "follow",
        from: req.user?._id,
        to: userToModify._id,
      });
      await newNotification.save();

      res.status(200).json({ message: "User followed successfully" });
      return;
    }
  } catch (error) {
    console.error("Error in followUnfollowUser: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSuggestedUsers = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const usersFollowedByMe = await User.findById(userId).select("following");

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      { $sample: { size: 10 } },
      { $project: { password: 0 } },
    ]);

    const filteredUsers = users.filter(
      (user) => !usersFollowedByMe?.following.includes(user._id)
    );
    const suggestedUsers = filteredUsers.slice(0, 4);

    res.status(200).json(suggestedUsers);
    return;
  } catch (error) {
    console.error("Error in getSuggestedUsers: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { name, email, username, currentPassword, newPassword, bio, link } =
    req.body;
  let { profileImage, coverImage } = req.body;
  const userId = req.user?._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    if (
      (!newPassword && currentPassword) ||
      (!currentPassword && newPassword)
    ) {
      res.status(400).json({
        error: "Please provide both current password and new password",
      });
      return;
    }

    if (user.googleId && email && email !== user.email) {
      res.status(400).json({ error: "Google users cannot change their email" });
      return;
    }

    if (currentPassword && newPassword) {
      const isMatch = comparePasswords(currentPassword, user.password);
      if (!isMatch) {
        res.status(400).json({ error: "Current Password is incorrect" });
        return;
      }

      if (newPassword.length < 6) {
        res
          .status(400)
          .json({ error: "Password must be at least 6 characters long" });
        return;
      }

      user.password = hashPassword(newPassword);
    }
  } catch (error) {}
};

export default {
  getUserProfile,
  followUnfollowUser,
  getSuggestedUsers,
  updateUser,
};
