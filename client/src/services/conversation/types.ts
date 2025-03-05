import { Conversation } from "@/types/Conversation";

export type GetConversationsType = {
  items: Conversation;
  message: string;
};

export type GetAllConversationsType = {
  items: Conversation[];
  message: string;
};
