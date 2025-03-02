import axiosInstance from "../axiosInstance";
import { GetUserConversationsType } from "./types";

const getConversation = async ({ userId }: { userId: string }) => {
  return await axiosInstance.get<GetUserConversationsType>(
    `/conversation/${userId}`
  );
};

const createConversation = async (data: {
  userEmail: string;
  username: string;
  userId: string;
}) => {
  return await axiosInstance.post("/conversation", data);
};

const conversationService = {
  getConversation,
  createConversation,
};

export default conversationService;
