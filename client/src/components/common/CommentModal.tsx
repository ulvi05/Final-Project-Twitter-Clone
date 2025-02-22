import { useState } from "react";
import { PostType } from "@/types/Post";
import { Comment } from "@/types/Comment";

import { useDialog, ModalTypeEnum } from "@/hooks/useDialog";
import LoadingSpinner from "./LoadingSpinner";

const CommentModal = ({ post }: { post: PostType }) => {
  const { type, isOpen, closeDialog } = useDialog();
  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  if (type !== ModalTypeEnum.COMMENT || !isOpen) return null;

  const handlePostComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsCommenting(true);

    setTimeout(() => {
      console.log("New comment:", comment);
      setComment("");
      setIsCommenting(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <dialog open className="border-none outline-none modal">
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
                      src={comment.user.profileImg || "/avatars/user-2.png"}
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

          <form onSubmit={handlePostComment} className="flex gap-2 mt-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 p-2 border rounded outline-none"
              placeholder="Write a comment..."
            />
            <button
              type="submit"
              className="rounded-lg btn btn-primary"
              disabled={isCommenting}
            >
              {isCommenting ? <LoadingSpinner size="md" /> : "Post"}
            </button>
          </form>

          <button
            onClick={closeDialog}
            className="mt-4 rounded-lg btn btn-secondary"
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default CommentModal;
