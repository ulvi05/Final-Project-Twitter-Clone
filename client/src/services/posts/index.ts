import axiosInstance from "../axiosInstance";

export const getPosts = async (feedType: "forYou" | "following") => {
  const endpoint = feedType === "following" ? "/posts/following" : "/posts/all";
  const { data } = await axiosInstance.get(endpoint);
  return data;
};
