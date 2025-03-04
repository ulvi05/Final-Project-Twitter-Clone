import { Request, Response } from "express";
import Conversation from "../mongoose/schema/conversation";

const getAll = async (req: Request, res: Response) => {
  try {
    const conversations = await Conversation.find()
      .populate("userId", "username email")
      .populate("recipientId", "username email")
      .populate("messages");

    res.status(200).json({
      message: "Conversations fetched successfully",
      items: conversations,
    });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getUserConversation = async (req: Request, res: Response) => {
  try {
    if (!req.isAuthenticated() || !req.user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const conversations = await Conversation.find({
      $or: [{ userId: req.user._id }, { recipientId: req.user._id }],
    })
      .populate("userId", "username email")
      .populate("recipientId", "username email")
      .populate("messages");

    if (!conversations || conversations.length === 0) {
      res.status(404).json({ message: "No conversations found" });
      return;
    }

    res.status(200).json({
      message: "Conversations fetched successfully",
      items: conversations,
    });
  } catch (error) {
    console.error("Error fetching user conversation:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    if (!req.isAuthenticated() || !req.user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const { recipientId } = req.body;

    if (!recipientId) {
      res.status(400).json({ message: "recipientId is required" });
      return;
    }

    if (req.user._id.toString() === recipientId) {
      res
        .status(400)
        .json({ message: "You cannot start a conversation with yourself" });
      return;
    }

    const existingConversation = await Conversation.findOne({
      $or: [
        { userId: req.user._id.toString(), recipientId: recipientId },
        { userId: recipientId, recipientId: req.user._id.toString() },
      ],
    });

    if (existingConversation) {
      res.status(200).json({
        message: "Conversation already exists",
        item: existingConversation,
      });
      return;
    }

    const conversation = await Conversation.create({
      userId: req.user._id.toString(),
      recipientId: recipientId,
    });

    res.status(201).json({
      message: "Conversation created successfully",
      item: conversation,
    });
    return;
  } catch (error) {
    console.error("Error creating conversation:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

export default {
  getAll,
  create,
  getUserConversation,
};
