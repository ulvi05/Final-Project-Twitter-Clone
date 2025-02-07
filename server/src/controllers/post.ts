import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";

import User from "../mongoose/schema/user";
import Post from "../mongoose/schema/post";

const createPost = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    let { img, video } = req.body;

    const userId = req.user?._id.toString();

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    if (!text && !img && !video) {
      res.status(400).json({ message: "Post must have text or image" });
      return;
    }

    let mediaUrl = "";

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      mediaUrl = uploadedResponse.secure_url;
    }

    if (video) {
      const uploadedResponse = await cloudinary.uploader.upload(video, {
        resource_type: "video",
      });
      mediaUrl = uploadedResponse.secure_url;
    }

    const newPost = new Post({
      user: userId,
      text,
      img: img ? mediaUrl : undefined,
      video: video ? mediaUrl : undefined,
    });

    await newPost.save();

    res.status(201).json(newPost);
    return;
  } catch (error) {
    console.log("Error createPost: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  createPost,
};
