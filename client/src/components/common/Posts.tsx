import Post from "./PostOne";
import PostSkeleton from "../skeletons/PostSkeleton";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { PostType } from "@/types/Post";
import { useEffect } from "react";
import postService from "@/services/posts";

interface PostsProps {
  feedType: "forYou" | "following";
}

const Posts = ({ feedType }: PostsProps) => {
  const {
    data: posts,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: [QUERY_KEYS.POSTS, feedType],
    queryFn: () => postService.getPosts(feedType),
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
