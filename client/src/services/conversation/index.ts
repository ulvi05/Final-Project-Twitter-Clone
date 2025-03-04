import axiosInstance from "../axiosInstance";
import { GetAllConversationsType, GetUserConversationsType } from "./types";

const getAllConversations = async () => {
  return await axiosInstance.get<GetAllConversationsType>("/conversation");
};

const getConversation = async ({ userId }: { userId: string }) => {
  const response = await axiosInstance.get<GetUserConversationsType>(
    `/conversation/${userId}`
  );
  return response.data;
};

const createConversation = async (data: { recipientId: string }) => {
  return await axiosInstance.post("/conversation", data);
};

const conversationService = {
  getConversation,
  createConversation,
  getAllConversations,
};

export default conversationService;
