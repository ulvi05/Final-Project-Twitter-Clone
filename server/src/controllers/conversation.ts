import { Request, Response } from "express";
import Conversation from "../mongoose/schema/conversation";

const getAll = async (req: Request, res: Response) => {
  try {
    const conversations = await Conversation.find();

    res.status(200).json({
      message: "Conversations fetched successfully",
      items: conversations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const getUserConversation = async (req: Request, res: Response) => {
  try {
    let { userId } = req.params;
    if (req.isAuthenticated()) {
      userId = req.user._id.toString();
    }
    const conversation = await Conversation.findOne({
      userId,
    }).populate("messages");

    if (!conversation) {
      res.status(404).json({
        message: "Conversation not found",
      });
      return;
    }
    res.status(200).json({
      message: "Conversation fetched successfully",
      item: conversation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const create = async (req: Request, res: Response) => {
  try {
    if (!req.isAuthenticated() || !req.user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const existingConversation = await Conversation.findOne({
      userId: req.user._id,
    }).populate("messages");

    if (existingConversation) {
      res.status(200).json({
        message: "Conversation already exists",
        items: existingConversation,
      });
      return;
    }

    const conversation = await Conversation.create({
      userId: req.user._id,
      userName: req.user.fullName,
    });

    res.status(201).json({
      message: "Conversation created successfully",
      items: conversation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  getAll,
  create,
  getUserConversation,
};
