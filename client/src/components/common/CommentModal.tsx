import { useState, useEffect } from "react";
import { PostType } from "@/types/Post";
import { Comment } from "@/types/Comment";

import { useDialog, ModalTypeEnum } from "@/hooks/useDialog";
import LoadingSpinner from "./LoadingSpinner";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useMutation } from "@tanstack/react-query";
import postService from "@/services/posts";
import { toast } from "sonner";
import queryClient from "@/config/queryClient";

const CommentModal = ({ post }: { post: PostType }) => {
  const { type, isOpen, closeDialog } = useDialog();
  const [comment, setComment] = useState("");

  useEffect(() => {
    const modal = document.getElementById(
      `comments_modal${post._id}`
    ) as HTMLDialogElement;
    if (isOpen && type === ModalTypeEnum.COMMENT) {
      modal?.showModal();
    } else {
      modal?.close();
    }
  }, [isOpen, type]);

  const { mutate: commentPost, isPending: isCommenting } = useMutation({
    mutationFn: postService.commentPost,
    onSuccess: (newComment) => {
      queryClient.setQueryData(
        [QUERY_KEYS.POSTS],
        (oldData: PostType[] | undefined) => {
          if (!oldData) return [];
          return oldData.map((p) =>
            p._id === newComment.postId
              ? { ...p, comments: [...p.comments, newComment] }
              : p
          );
        }
      );

      toast.success("Comment posted successfully");
      setComment("");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handlePostComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCommenting) return;
    commentPost({ postId: post._id, text: comment });
  };

  return (
    <dialog
      id={`comments_modal${post._id}`}
      className="border-none outline-none modal"
    >
      <div className="border border-gray-600 modal-box rounded-xl">
        <h3 className="mb-4 text-lg font-bold">COMMENTS</h3>
        <div className="flex flex-col gap-3 overflow-auto max-h-60">
          {post.comments.length === 0 && (
            <p className="text-sm text-slate-500">
              No comments yet 🤔 Be the first one 😉
            </p>
          )}
          {post.comments.map((comment: Comment) => (
            <div key={comment._id} className="flex items-start gap-2">
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img
                    src={comment.user.profileImg || "/avatar-placeholder.png"}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold">{comment.user.fullName}</span>
                <span className="text-sm text-gray-700">
                  @{comment.user.username}
                </span>
                <div className="text-sm">{comment.text}</div>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handlePostComment}
          className="flex items-center gap-2 pt-2 mt-4 border-t border-gray-600"
        >
          <textarea
            className="w-full p-1 border border-gray-800 rounded resize-none textarea text-md focus:outline-none"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 text-white rounded-full btn btn-primary btn-sm"
            disabled={isCommenting}
          >
            {isCommenting ? <LoadingSpinner size="md" /> : "Post"}
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeDialog}>Close</button>
      </form>
    </dialog>
  );
};

export default CommentModal;
