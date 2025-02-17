import { Link } from "react-router-dom";
import { Post } from "@/types/Post";
import { useDialog, ModalTypeEnum } from "@/hooks/useDialog";
import CommentModal from "@/components/common/CommentModal";

import { FaRegComment, FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { IoIosMore } from "react-icons/io";

import { useState } from "react";

const PostOne = ({ post }: { post: Post }) => {
  const { openDialog } = useDialog();
  const postOwner = post.user;
  const [isLiked, setIsLiked] = useState(post.likes.includes("currentUserId"));
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const isMyPost = true;
  const formattedDate = "1h";

  const handleLikePost = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleDeletePost = () => {
    console.log("Post deleted!");
    // Burada API çağrısı yapabilirsiniz
  };

  return (
    <>
      <div className="flex items-start gap-2 p-4 border-b border-gray-700">
        <div className="avatar">
          <Link
            to={`/profile/${postOwner.username}`}
            className="w-8 overflow-hidden rounded-full"
          >
            <img src={postOwner.profileImg || "/avatar-placeholder.png"} />
          </Link>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2">
            <Link to={`/profile/${postOwner.username}`} className="font-bold">
              {postOwner.fullName}
            </Link>
            <span className="flex gap-1 text-sm text-gray-700">
              <Link to={`/profile/${postOwner.username}`}>
                @{postOwner.username}
              </Link>
              <span>·</span>
              <span>{formattedDate}</span>
            </span>
            {isMyPost && (
              <div className="flex justify-end flex-1">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="p-2 transition duration-200 rounded-full cursor-pointer hover:bg-blue-900 hover:bg-opacity-50"
                  >
                    <IoIosMore className="text-slate-500 hover:text-blue-400" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-44"
                  >
                    <li>
                      <button onClick={handleDeletePost}>Delete Post</button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 overflow-hidden">
            <span>{post.text}</span>
            {post.img && (
              <img
                src={post.img || "/avatars/user-3.png"}
                className="object-contain border border-gray-700 rounded-lg h-80"
                alt=""
              />
            )}
          </div>
          <div className="flex justify-between mt-3">
            <div className="flex items-center justify-between w-2/3 gap-4">
              <div
                className="flex items-center gap-1 cursor-pointer group"
                onClick={() => openDialog(ModalTypeEnum.COMMENT)}
              >
                <div className="p-2 transition duration-200 rounded-full group-hover:bg-sky-900 group-hover:bg-opacity-50">
                  <FaRegComment className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
                </div>
                <span className="text-sm text-slate-500 group-hover:text-sky-400">
                  {post.comments.length}
                </span>
              </div>

              <div className="flex items-center gap-1 cursor-pointer group">
                <div className="p-2 transition duration-200 rounded-full group-hover:bg-green-900 group-hover:bg-opacity-50">
                  <BiRepost className="w-6 h-6 text-slate-500 group-hover:text-green-500" />
                </div>
                <span className="text-sm text-slate-500 group-hover:text-green-500">
                  0
                </span>
              </div>

              <div
                className="flex items-center gap-1 cursor-pointer group"
                onClick={handleLikePost}
              >
                <div className="p-2 transition duration-200 rounded-full group-hover:bg-pink-900 group-hover:bg-opacity-50">
                  <FaRegHeart
                    className={`w-4 h-4 transition duration-200 ${
                      isLiked ? "text-pink-500" : "text-slate-500"
                    } group-hover:text-pink-500`}
                  />
                </div>
                <span
                  className={`text-sm transition duration-200 ${
                    isLiked ? "text-pink-500" : "text-slate-500"
                  } group-hover:text-pink-500`}
                >
                  {likeCount}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end w-1/3 gap-2 group">
              <div className="p-2 transition duration-200 rounded-full cursor-pointer group-hover:bg-blue-900 group-hover:bg-opacity-50">
                <FaRegBookmark className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <CommentModal post={post} />
    </>
  );
};

export default PostOne;
