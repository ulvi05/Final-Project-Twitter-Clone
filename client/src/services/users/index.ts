import axiosInstance from "../axiosInstance";
import { GetAllUserResponse } from "./types";

const getAll = async () => {
  const response = await axiosInstance.get<GetAllUserResponse>(
    "/users/suggested"
  );
  return response.data;
};

const UserProfile = async (username: string) => {
  const response = await axiosInstance.get(`/users/profile/${username}`);
  return response.data;
};

const followUser = async (userId: string) => {
  const response = await axiosInstance.post(`/users/follow/${userId}`);
  return response.data;
};

const usersService = {
  getAll,
  UserProfile,
  followUser,
};

export default usersService;
