import { Message } from "./Message";

export type Conversation = {
  _id: string;
  userId: string;
  messages: Message[];
  createdAt: Date;
};
