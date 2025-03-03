import { Message } from "./Message";

export type Conversation = {
  _id: string;
  userId: string;
  username: string;
  recipientId: string;
  messages: Message[];
  createdAt: Date;
};
