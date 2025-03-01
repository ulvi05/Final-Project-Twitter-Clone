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

    const conversation = await Conversation.findOne({
      userId: req.user._id,
    }).populate("messages");

    if (!conversation) {
      res.status(404).json({ message: "Conversation not found" });
      return;
    }

    res.status(200).json({
      message: "Conversation fetched successfully",
      item: conversation,
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

    const existingConversation = await Conversation.findOne({
      userId: req.user._id,
    });

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
      item: conversation,
    });
  } catch (error) {
    console.error("Error creating conversation:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export default {
  getAll,
  create,
  getUserConversation,
};
