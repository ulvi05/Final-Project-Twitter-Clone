import axiosInstance from "../axiosInstance";

const getPosts = async (feedType: "forYou" | "following") => {
  const endpoint = feedType === "following" ? "/posts/following" : "/posts/all";
  const { data } = await axiosInstance.get(endpoint);

  console.log(data);

  return data;
};

const create = async (data: { text: string; media?: File | null }) => {
  const formData = new FormData();
  formData.append("text", data.text);

  if (data.media) {
    if (data.media.type.startsWith("image")) {
      formData.append("img", data.media);
    } else if (data.media.type.startsWith("video")) {
      formData.append("video", data.media);
    }
  }

  const response = await axiosInstance.post("/posts/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const likePost = async (data: { postId: string }) => {
  const response = await axiosInstance.post(`/posts/like/${data.postId}`);
  return response.data;
};

const deletePost = async (data: { id: string }) => {
  return await axiosInstance.delete(`/posts/${data.id}`);
};

const postService = {
  getPosts,
  create,
  likePost,
  deletePost,
};

export default postService;
