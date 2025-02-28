import axiosInstance from "../axiosInstance";
import { GetUserConversationsType } from "./types";

export const getConversation = async ({ userId }: { userId: string }) => {
  return await axiosInstance.get<GetUserConversationsType>(
    `/conversation/${userId}`
  );
};

const conversationService = {
  getConversation,
};

export default conversationService;
