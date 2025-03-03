import { Conversation } from "@/types/Conversation";

export type GetUserConversationsType = {
  item: Conversation;
  message: string;
};

export type GetAllConversationsType = {
  items: Conversation[];
  message: string;
};
