import { Conversation } from "./Conversation";

export type Message = {
  _id: string;
  text: string;
  userId: string;
  conversation: string | Conversation;
  createdAt: Date;
  updatedAt: Date;
};
