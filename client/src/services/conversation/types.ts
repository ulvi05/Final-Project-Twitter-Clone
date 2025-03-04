import { Conversation } from "@/types/Conversation";

export type GetUserConversationsType = {
  items: Conversation;
  message: string;
};

export type GetAllConversationsType = {
  items: Conversation[];
  message: string;
};
