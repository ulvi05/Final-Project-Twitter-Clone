import axiosInstance from "../axiosInstance";
import { GetAllUserResponse } from "./types";

const getAll = async () => {
  const response = await axiosInstance.get<GetAllUserResponse>(
    "/users/suggested"
  );
  return response.data;
};

const usersService = {
  getAll,
};

export default usersService;
