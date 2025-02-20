import Post from "./PostOne";
import PostSkeleton from "../skeletons/PostSkeleton";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import axiosInstance from "@/services/axiosInstance";
import { PostType } from "@/types/Post";
import { useEffect } from "react";

interface PostsProps {
  feedType: "forYou" | "following";
}

const Posts = ({ feedType }: PostsProps) => {
  const POST_ENDPOINT =
    feedType === "following" ? "/posts/following" : "/posts/all";

  const {
    data: posts,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: async () => {
      const { data } = await axiosInstance.get(POST_ENDPOINT);
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [feedType, refetch]);

  return (
    <>
      {isLoading || isRefetching ? (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      ) : posts?.length === 0 ? (
        <p className="my-4 text-center">No posts in this tab. Switch 👻</p>
      ) : (
        <div>
          {posts.map((post: PostType) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
