import axiosInstance from "../axiosInstance";
import { GetUserConversationsType } from "./types";

const getConversation = async ({ userId }: { userId: string }) => {
  return await axiosInstance.get<GetUserConversationsType>(
    `/conversation/${userId}`
  );
};

const createConversation = async ({
  userEmail,
  userName,
  userId,
}: {
  userEmail: string;
  userName: string;
  userId: string;
}) => {
  return await axiosInstance.post("/conversation", {
    userEmail,
    userName,
    userId,
  });
};

const conversationService = {
  getConversation,
  createConversation,
};

export default conversationService;
